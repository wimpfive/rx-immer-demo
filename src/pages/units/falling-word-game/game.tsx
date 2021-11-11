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

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export default Game;
