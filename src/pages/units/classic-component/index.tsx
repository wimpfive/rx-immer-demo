import { Component } from 'react';
import { Button, Card } from 'antd';

import { Context } from './context';
import AddBookModal from './AddBookModal';
import BookTable from './BookTable';

class ClassicComponent extends Component {
  render() {
    return (
      <Context.Provider>
        <Card
          title="Class组件测试"
          extra={
            <AddBookModal>
              <Button type="primary">Add</Button>
            </AddBookModal>
          }
        >
          <BookTable />
        </Card>
      </Context.Provider>
    );
  }
}

export default ClassicComponent;
