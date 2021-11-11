import { FunctionComponent, useState } from 'react';
import { Button, Card, Col, InputNumber, Row, Space } from 'antd';
import { LoadingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { IGame } from './entity';
import { useGame } from './hooks';
import Game from './game';
import Viewer from './components/viewer';
import Screen from './components/Screen';

const FallingWordGame: FunctionComponent = () => {
  const { game, start, stop, clear } = useGame();
  const status = game.useBind<IGame['status']>('status');
  const running = status === 'running';
  const [i, setI] = game.useTwoWayBind<number>('env.params.i');
  const [a, setA] = game.useTwoWayBind<number>('env.params.a');
  const [size, setSize] = game.useTwoWayBind<number>('env.itemStyle.size');

  const [visible, setVisible] = useState(false);

  return (
    <Game>
      <Card
        title="抛字游戏"
        extra={
          <Space>
            <Button
              type="primary"
              icon={running ? <LoadingOutlined /> : <VideoCameraOutlined />}
              onClick={() => {
                if (running) {
                  stop();
                } else {
                  start();
                }
              }}
              danger={running}
            >
              {running ? '停止' : '开始'}
            </Button>
            <Button onClick={clear}>清空</Button>
          </Space>
        }
      >
        <Row gutter={32}>
          <Col span={6}>
            <Card
              title="设置"
              size="small"
              extra={
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setVisible((v) => !v);
                  }}
                >
                  {visible ? '隐藏数据' : '展示数据'}
                </Button>
              }
            >
              <Space direction="vertical">
                <Space>
                  帧间隔:
                  <InputNumber
                    value={i}
                    onChange={setI}
                    min={10}
                    disabled={running}
                  />
                </Space>
                <Space>
                  加速度:
                  <InputNumber value={a} onChange={setA} />
                </Space>
                <Space>
                  字大小:
                  <InputNumber
                    value={size}
                    onChange={setSize}
                    min={16}
                    max={128}
                  />
                </Space>
              </Space>
              {visible && (
                <Viewer
                  style={{ height: 'calc(70vh - 210px)', overflowY: 'scroll' }}
                />
              )}
            </Card>
          </Col>
          <Col span={18}>
            <Screen />
          </Col>
        </Row>
      </Card>
    </Game>
  );
};

export default FallingWordGame;
