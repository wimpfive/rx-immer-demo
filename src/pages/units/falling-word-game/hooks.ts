import { distinctUntilChanged, filter, map, pairwise } from 'rxjs';
import { useContext, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { GameContext, IGame } from './entity';

export const useGame = () => {
  const game = useContext(GameContext);

  useEffect(() => {
    game.startAffair(function () {
      const run = (i: number) => {
        this.commit((g) => {
          const { a } = g.env.params;
          const { height } = g.env.container;
          const d = (i * a) / 1000;

          Object.values(g.items).forEach((item) => {
            item.x += item.vx;
            item.y += item.vy;
            item.vy += d;
          });
          Object.entries(g.items).forEach(([key, item]) => {
            if (item.y + item.height > height) {
              delete g.items[key];
            }
          });
        });
      };

      const subscription = this.observe<IGame['clock']>('clock')
        .pipe(
          distinctUntilChanged(),
          pairwise(),
          filter(function (v): v is [number, number] {
            return v[0] !== undefined && v[1] !== undefined;
          }),
          map(([pt, ct]) => ct - pt),
        )
        .subscribe(run);

      return () => {
        subscription.unsubscribe();
      };
    }, 'main');

    return () => {
      game.stopAffair('main');
    };
  }, [game]);

  const sync = () => {
    game.commit((g) => {
      g.clock = Date.now();
    });
  };

  const start = () => {
    game.commit((g) => {
      g.clock = Date.now();
      g.status = 'running';
    });

    const { i } = game.value().env.params;
    game.startAffair(() => {
      const interval = setInterval(sync, i);
      return () => {
        clearInterval(interval);
      };
    }, 'play');
  };

  const stop = () => {
    game.commit((g) => {
      g.status = 'stopped';
      delete g.clock;
    });

    game.stopAffair('play');
  };

  const clear = () => {
    game.commit((g) => {
      Object.keys(g.items).forEach((key) => {
        delete g.items[key];
      });
    });
  };

  const add = (item: { word: string; color: string }) => {
    game.commit((g) => {
      if (g.pointer) {
        const { size } = g.env.itemStyle;
        const width = size;
        const height = size;
        const { x, y, vx, vy } = g.pointer;

        g.items[uniqueId('item-')] = {
          ...item,
          x: x - width / 2,
          y: y - height / 2,
          vx,
          vy,
          width,
          height,
        };
      }
    });
  };

  const resize = (size: { width: number; height: number }) => {
    game.commit<IGame['env']['container']>((container) => {
      container.width = size.width;
      container.height = size.height;
    }, 'env.container');
  };

  const point = (pointer?: { x: number; y: number }) => {
    const now = Date.now();
    game.commit((g) => {
      if (pointer) {
        if (g.pointer) {
          const dt = Math.max(now - g.pointer.timeStamp, 1);
          g.pointer.vx = (pointer.x - g.pointer.x) / dt;
          g.pointer.vy = (pointer.y - g.pointer.y) / dt;
          g.pointer.x = pointer.x;
          g.pointer.y = pointer.y;
          g.pointer.timeStamp = now;
        } else {
          g.pointer = { ...pointer, vx: 0, vy: 0, timeStamp: now };
        }
      } else {
        delete g.pointer;
      }
    });
  };

  return { game, start, stop, clear, add, resize, point };
};
