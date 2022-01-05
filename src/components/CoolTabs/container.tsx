import React, { FC } from 'react';
import { Tabs } from 'antd';

import { CoolTabsController } from './entity';

interface ContainerProps {
  controller: CoolTabsController;
}

const Container: FC<ContainerProps> = (props) => {
  const { controller } = props;
  const { tabs, activeKey } = controller.store.useBind();

  return (
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={activeKey}
      onChange={(k) => {
        controller.change(k);
      }}
      onEdit={(e, action) => {
        if (action === 'remove') {
          controller.close(e.toString());
        }
      }}
    >
      {tabs.map((config) => {
        const { key, closable, forceRender, tab, children } = config;
        return (
          <Tabs.TabPane {...{ key, tabKey: key, tab, closable, forceRender }}>
            {children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default Container;
