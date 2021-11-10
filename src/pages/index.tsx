import { FunctionComponent, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Playground from './playground';
import FallingWordGame from './units/falling-word-game';

const Index: FunctionComponent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('playground');

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        tabList={[
          { key: 'playground', tab: '综合演示' },
          { key: 'falling-word-game', tab: '抛字游戏' },
        ]}
        tabActiveKey={tabActiveKey}
        onTabChange={setTabActiveKey}
      >
        {(() => {
          switch (tabActiveKey) {
            case 'playground':
              return <Playground />;
            case 'falling-word-game':
              return <FallingWordGame />;
            default:
              return null;
          }
        })()}
      </PageContainer>
    </div>
  );
};

export default Index;
