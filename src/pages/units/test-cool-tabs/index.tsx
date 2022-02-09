import { Button, Card, Space } from 'antd';
import { FunctionComponent } from 'react';
import { uniqueId } from 'lodash';

import CoolTabs, { touchCoolTabsController } from '@/components/CoolTabs';

const TestCoolTabs: FunctionComponent = () => {
  return (
    <Card
      title="测试标签"
      extra={
        <Space>
          <Button
            onClick={() => {
              const key = uniqueId('tab');
              touchCoolTabsController()?.open(key, {
                tab: `新增${key}`,
                children: <Card title={`新增${key}`}>新增{key}</Card>,
              });
            }}
          >
            添加
          </Button>
        </Space>
      }
    >
      <CoolTabs />
    </Card>
  );
};

export default TestCoolTabs;
