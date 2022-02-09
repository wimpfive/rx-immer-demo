import { Component } from 'react';
import {
  ComposedProps,
  injectDataWithInstance,
  injectInstanceWithContext,
} from 'rx-immer-react';
import { Button, Table } from 'antd';

import { Context } from './context';

class BookTable extends Component<ComposedProps> {
  private delete() {
    const { instance } = this.props;
    instance.commit((books) => {
      books.pop();
    }, 'books');
  }

  render() {
    const { data } = this.props;

    return (
      <Table
        dataSource={data.books}
        columns={[
          { title: 'title', dataIndex: 'title' },
          { title: 'author', dataIndex: 'author' },
          { title: 'price', dataIndex: 'price' },
        ]}
        footer={() => (
          <Button danger onClick={this.delete.bind(this)}>
            delete
          </Button>
        )}
      />
    );
  }
}

export default injectInstanceWithContext(Context)(
  injectDataWithInstance({ books: 'books' })(BookTable),
);
