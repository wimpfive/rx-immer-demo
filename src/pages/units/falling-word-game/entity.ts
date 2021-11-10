import { createRxImmerContext } from 'rx-immer-react';

export interface IItem {
  word: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

export interface IGame {
  status: 'running' | 'stopped';
  clock?: number;
  items: Record<string, IItem>;
  pointer?: {
    timeStamp: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
  env: {
    container: {
      width: number;
      height: number;
    };
    params: {
      i: number;
      a: number;
    };
    itemStyle: {
      size: number;
    };
  };
}

const INIT_GAME: IGame = {
  status: 'stopped',
  items: {},
  env: {
    container: { width: 0, height: 0 },
    params: { i: 10, a: 10 },
    itemStyle: { size: 48 },
  },
};

export const GameContext = createRxImmerContext<IGame>(INIT_GAME, {
  history: false,
});
