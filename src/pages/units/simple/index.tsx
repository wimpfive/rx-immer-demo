import { FunctionComponent, useState } from 'react';
import { Card, Input, Space, Tag, Typography } from 'antd';
import { Path } from 'rx-immer';
import { compose, RxImmerWithHooks, useRxImmer } from 'rx-immer-react';

const Edit: FunctionComponent<{
  store: RxImmerWithHooks<any>;
  path: Path;
}> = (props) => {
  const { store, path } = props;

  const [value, setValue] = store.useTwoWayBind(path);

  return (
    <Input
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

const View: FunctionComponent<{
  store: RxImmerWithHooks<any>;
  mapping: { state: any };
  space?: string | number;
}> = (props) => {
  const { mapping, space } = props;
  const { state = {} } = mapping;

  return (
    <Typography.Paragraph>
      <pre>{JSON.stringify(state, undefined, space)}</pre>
    </Typography.Paragraph>
  );
};

const ComposedView = compose({ state: [] }, {}, 'mapping', 'store')(View);

const Simple: FunctionComponent = () => {
  const store = useRxImmer<any>({ a: [{ b: { c: 'test' } }, 1, 'abc', {}] });

  const [path, setPath] = useState('a[0].b.c');
  const value = store.useBind(path);

  return (
    <Card
      title={
        <Space>
          数据:<Tag>{`${value}`}</Tag>
        </Space>
      }
    >
      <Space direction="vertical">
        <Space>
          路径:
          <Input
            value={path}
            onChange={(event) => {
              setPath(event.target.value);
            }}
          />
        </Space>
        <Space>
          编辑:
          <Edit store={store} path={path} />
        </Space>
        <ComposedView store={store} space={4} />
      </Space>
    </Card>
  );
};

export default Simple;
