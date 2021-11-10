import { useContext } from 'react';
import { uniqueId } from 'lodash';
import { GameContext, IGame } from './entity';

export const useGame = () => {
  const game = useContext(GameContext);

  const run = (i: number) => {
    game.commit((g) => {
      const { a } = g.env.params;
      const { width, height } = g.env.container;
      const d = (i * a) / 1000;

      g.clock = Date.now();
      Object.values(g.items).forEach((item) => {
        item.x += item.vx;
        item.vy += d;
        item.y += item.vy;
      });
      Object.entries(g.items).forEach(([key, item]) => {
        if (item.y + item.height > height) {
          delete g.items[key];
        }
      });
    });
  };

  const start = () => {
    const { i } = game.value().env.params;
    game.commit((g) => {
      g.clock = Date.now();
      g.status = 'running';
    });

    game.startAffair(() => {
      const interval = setInterval(() => {
        run(i);
      }, i);
      return () => {
        clearInterval(interval);
      };
    }, 'play');
  };

  const stop = () => {
    game.commit((g) => {
      delete g.clock;
      g.status = 'stopped';
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
        g.items[uniqueId('item-')] = {
          ...item,
          width: g.env.itemStyle.size,
          height: g.env.itemStyle.size,
          x: g.pointer.x,
          y: g.pointer.y,
          vx: g.pointer.vx,
          vy: g.pointer.vy,
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
