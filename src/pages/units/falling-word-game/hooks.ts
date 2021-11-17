import { useCallback, useContext, useMemo } from 'react';
import { RxImmerWithHooks } from 'rx-immer-react';
import { uniqueId } from 'lodash';
import { GameContext, IGame } from './entity';

export const useGame = () => {
  const game = useContext(GameContext);

  const items = useMemo(
    () => game.sub<RxImmerWithHooks<IGame['items']>>('items'),
    [game],
  );
  const env = useMemo(
    () => game.sub<RxImmerWithHooks<IGame['env']>>('env'),
    [game],
  );
  const container = useMemo(
    () => env.sub<RxImmerWithHooks<IGame['env']['container']>>('container'),
    [env],
  );
  const params = useMemo(
    () => env.sub<RxImmerWithHooks<IGame['env']['params']>>('params'),
    [env],
  );
  const itemStyle = useMemo(
    () => env.sub<RxImmerWithHooks<IGame['env']['itemStyle']>>('itemStyle'),
    [env],
  );

  // 刷新时钟
  const sync = useCallback(() => {
    game.commit((g) => {
      g.clock = Date.now();
    });
  }, [game]);

  // 开始
  const start = useCallback(() => {
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
  }, [game]);

  // 停止
  const stop = useCallback(() => {
    game.commit((g) => {
      g.status = 'stopped';
      delete g.clock;
    });

    game.stopAffair('play');
  }, [game]);

  // 清空
  const clear = useCallback(() => {
    items.commit((items) => {
      Object.keys(items).forEach((key) => {
        delete items[key];
      });
    });
  }, [items]);

  // 添加
  const add = useCallback(
    (item: { word: string; color: string }) => {
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
    },
    [game],
  );

  // 界面尺寸变化
  const resize = useCallback(
    (size: { width: number; height: number }) => {
      container.commit((container) => {
        container.width = size.width;
        container.height = size.height;
      });
    },
    [container],
  );

  // 鼠标移动
  const point = useCallback(
    (pointer?: { x: number; y: number }) => {
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
    },
    [game],
  );

  return {
    game,
    items,
    container,
    params,
    itemStyle,
    start,
    stop,
    clear,
    add,
    resize,
    point,
  };
};
