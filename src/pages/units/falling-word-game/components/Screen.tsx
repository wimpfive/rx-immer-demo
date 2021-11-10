import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { distinctUntilChanged, map } from 'rxjs';
import { random } from 'lodash';
import { IGame, IItem } from '../entity';
import { useGame } from '../hooks';
import Item from './Item';

const Screen: FunctionComponent = () => {
  const { game, resize, point, add } = useGame();

  const resizeObserverRef = useRef<ResizeObserver>();
  if (!resizeObserverRef.current) {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      const [entry] = entries;
      resize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
  }

  const ref = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<Record<string, IItem>>({});

  useEffect(() => {
    if (ref.current) {
      resize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
      resizeObserverRef.current!.observe(ref.current);

      return () => {
        if (ref.current) {
          resizeObserverRef.current!.unobserve(ref.current);
        }
      };
    }
  }, []);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      add({
        word: ev.key,
        color: `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
      });
    };
    window.addEventListener('keypress', listener);
    return () => {
      window.removeEventListener('keypress', listener);
    };
  }, []);

  useEffect(() => {
    const subscription = game
      .observe<IGame['items']>('items')
      .pipe(
        map((items) => ({ keys: Object.keys(items).sort().join(), items })),
        distinctUntilChanged((p, c) => p.keys === c.keys),
      )
      .subscribe(({ items }) => {
        setItems(items);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [game]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        backgroundColor: 'lightgray',
        margin: '14px 0',
        overflow: 'hidden',
      }}
      onMouseMove={(event) => {
        point({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        });
      }}
      onMouseLeave={() => {
        point();
      }}
    >
      {Object.entries(items).map(([key]) => (
        <Item key={key} i={key} />
      ))}
    </div>
  );
};

export default Screen;
