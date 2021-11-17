import { FunctionComponent, useContext, useEffect } from 'react';
import { distinctUntilChanged, filter, map, pairwise } from 'rxjs';
import { GameContext, IGame } from './entity';

const Game: FunctionComponent = (props) => {
  const { children } = props;

  const game = useContext(GameContext);

  useEffect(() => {
    game.startAffair(function () {
      const run = (i: number) => {
        this.commit((g) => {
          const { a, cor, cof } = g.env.params;
          const { height } = g.env.container;
          const pad = 0.02 * height;
          const d = (i * a) / 1000;
          const tov = 2 * d;

          Object.values(g.items).forEach((item) => {
            item.x += item.vx;
            item.y += item.vy;
            item.vy += d;
          });

          Object.values(g.items)
            .filter((item) => item.y + item.height > height)
            .filter((item) => item.vy > 0)
            .forEach((item) => {
              item.vy *= -cor;
              item.vx *= cof;
            });

          Object.entries(g.items)
            .filter(([, item]) => item.y + item.height > height - pad)
            .filter(([, item]) => Math.sqrt(item.vx ** 2 + item.vy ** 2) < tov)
            .forEach(([key]) => {
              delete g.items[key];
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

  return <GameContext.Provider>{children}</GameContext.Provider>;
};

export default Game;
