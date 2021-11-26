import { FunctionComponent, useState } from 'react';
import { Button, Card, InputNumber, Space } from 'antd';
import { useRxImmer } from 'rx-immer-react';

const wait = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const AsyncTest: FunctionComponent = () => {
  const store = useRxImmer({ v: 0 });

  const [value, setValue] = store.useTwoWayBind('v');
  const [loading, setLoading] = useState(false);

  const inc = () => {
    setLoading(true);
    store
      .commitAsync<number>(async (v) => {
        await wait(1500);
        return v + 1;
      }, 'v')
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card>
      <Space>
        <InputNumber value={value} onChange={setValue} />
        <Button type="primary" loading={loading} onClick={inc}>
          +
        </Button>
      </Space>
    </Card>
  );
};

export default AsyncTest;
