import { cloneElement, Component, createRef, isValidElement } from 'react';
import {
  ComposedProps,
  injectDataWithInstance,
  injectInstanceWithContext,
} from 'rx-immer-react';
import { Form, FormInstance, Input, InputNumber, Modal } from 'antd';

import { Context } from './context';

class AddBookModal extends Component<ComposedProps, { visible: boolean }> {
  private formRef = createRef<FormInstance>();

  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private show() {
    this.setState({ visible: true });
  }

  private hide() {
    this.setState({ visible: false });
  }

  private clear() {
    this.formRef.current?.resetFields();
  }

  private async add() {
    const { instance } = this.props;

    await instance.commitAsync(async (books) => {
      const result = await this.formRef.current?.validateFields();
      if (result) {
        books.push(result);
      }
    }, 'books');
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <>
        {isValidElement(children) &&
          cloneElement(children, {
            onClick: () => {
              this.clear();
              this.show();
            },
          })}
        <Modal
          title="Add"
          visible={visible}
          onOk={async () => {
            await this.add();
            this.hide();
          }}
          onCancel={() => {
            this.hide();
          }}
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item name="title" label="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label="author"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="price" label="price" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default injectInstanceWithContext(Context)(
  injectDataWithInstance({ books: 'books' })(AddBookModal),
);
