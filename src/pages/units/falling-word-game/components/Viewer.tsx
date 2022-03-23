import { CSSProperties, FunctionComponent } from 'react';
import { injectInstanceWithContext, RxImmerReact } from 'rx-immer-react';
import { Typography } from 'antd';
import { GameContext, IGame } from '../entity';

const Viewer: FunctionComponent<{
  game: RxImmerReact<IGame>;
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

export default injectInstanceWithContext(GameContext, 'game')(Viewer);
