import { CSSProperties, FunctionComponent } from 'react';
import { injectWithContext, RxImmerWithHooks } from 'rx-immer-react';
import { Typography } from 'antd';
import { GameContext, IGame } from '../entity';

const Viewer: FunctionComponent<{
  game: RxImmerWithHooks<IGame>;
  style?: CSSProperties;
}> = (props) => {
  const { game, style } = props;

  const state = game.useBind();

  return (
    <Typography.Paragraph>
      <pre style={style}>{JSON.stringify(state, undefined, 4)}</pre>
    </Typography.Paragraph>
  );
};

export default injectWithContext(GameContext, 'game')(Viewer);
