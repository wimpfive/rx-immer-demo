import { FunctionComponent } from 'react';
import { Col, Row, Tabs } from 'antd';
import FormEditor from './FormEditor';
import StoreViewer from './StoreViewer';
import TableEditor from './TableEditor';
import TreeEditor from './TreeEditor';
// import ObjEditor from './ObjEditor';
import { PropsWithStore } from '..';

const Editor: FunctionComponent<PropsWithStore> = (props) => {
  const { store } = props;

  return (
    <Row gutter={16} wrap>
      <Col span={8}>
        <StoreViewer store={store} />
      </Col>
      <Col span={16}>
        <Tabs defaultActiveKey="form">
          <Tabs.TabPane key="form" tab="表单">
            <FormEditor store={store} />
          </Tabs.TabPane>
          <Tabs.TabPane key="components" tab="自定义组件">
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <TableEditor store={store} />
              </Col>
              <Col span={12}>
                <TreeEditor store={store} />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Editor;
