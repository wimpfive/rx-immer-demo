import { useCallback, useContext } from 'react';
import { uniqueId } from 'lodash';
import { GameContext, IGame } from './entity';

export const useGame = () => {
  const game = useContext(GameContext);

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
    game.commit((g) => {
      Object.keys(g.items).forEach((key) => {
        delete g.items[key];
      });
    });
  }, [game]);

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
      game.commit<IGame['env']['container']>((container) => {
        container.width = size.width;
        container.height = size.height;
      }, 'env.container');
    },
    [game],
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

  return { game, start, stop, clear, add, resize, point };
};
