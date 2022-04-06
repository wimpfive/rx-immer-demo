import { CSSProperties, FunctionComponent } from 'react';
import { Typography } from 'antd';
import store from './entity';

const Viewer: FunctionComponent<{
  style?: CSSProperties;
}> = (props) => {
  const { style } = props;

  const state = store.useBind();

  return (
    <Typography.Paragraph>
      <pre style={style}>{JSON.stringify(state, undefined, 4)}</pre>
    </Typography.Paragraph>
  );
};

export default Viewer;
