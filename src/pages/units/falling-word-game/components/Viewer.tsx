import { CSSProperties, FunctionComponent, useContext } from 'react';
import { Typography } from 'antd';
import { GameContext } from '../entity';

const Viewer: FunctionComponent<{ style?: CSSProperties }> = (props) => {
  const { style } = props;

  const game = useContext(GameContext);
  const state = game.useBind();

  return (
    <Typography.Paragraph>
      <pre style={style}>{JSON.stringify(state, undefined, 4)}</pre>
    </Typography.Paragraph>
  );
};

export default Viewer;
