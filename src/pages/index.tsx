import { FunctionComponent, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Simple from './units/simple';
import AsyncTest from './units/async';
import ClassicComponent from './units/classic-component';
import Playground from './playground';
import FallingWordGame from './units/falling-word-game';
import Query from './units/query';
import Hox from './units/hox';
import RxImmerDemo from './units/rx-immer-demo';

const Index: FunctionComponent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('simple');

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        tabList={[
          { key: 'simple', tab: '简单演示' },
          { key: 'async', tab: '异步更新' },
          { key: 'classic', tab: 'Class组件' },
          { key: 'falling-word-game', tab: '抛字游戏' },
          { key: 'query', tab: '测试查询' },
          { key: 'playground', tab: '综合演示' },
          { key: 'hox', tab: 'hox实例' },
          { key: 'rx-immer-demo', tab: 'rx-immer实例' },
        ]}
        tabActiveKey={tabActiveKey}
        onTabChange={setTabActiveKey}
      >
        {(() => {
          switch (tabActiveKey) {
            case 'simple':
              return <Simple />;
            case 'async':
              return <AsyncTest />;
            case 'classic':
              return <ClassicComponent />;
            case 'playground':
              return <Playground />;
            case 'falling-word-game':
              return <FallingWordGame />;
            case 'query':
              return <Query />;
            case 'hox':
              return <Hox />;
            case 'rx-immer-demo':
              return <RxImmerDemo />;
            default:
              return null;
          }
        })()}
      </PageContainer>
    </div>
  );
};

export default Index;
