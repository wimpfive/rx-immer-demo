import { FunctionComponent, useContext } from 'react';
import { Typography } from 'antd';
import { GameContext } from '../entity';

const Viewer: FunctionComponent = () => {
  const game = useContext(GameContext);
  const state = game.useBind();

  return (
    <Typography.Paragraph>
      <pre style={{ height: 'calc(70vh - 176px)', overflowY: 'scroll' }}>
        {JSON.stringify(state, undefined, 4)}
      </pre>
    </Typography.Paragraph>
  );
};

export default Viewer;
