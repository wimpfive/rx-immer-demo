import { Card, Input } from 'antd';
import CustomerForm from './CustomerForm';
import { formData } from './entity';
import Viewer from './viewer';

const RxImmerDemo = () => {
  const [name, setName] = formData.useTwoWayBind('name');

  return (
    <Card
      title={name}
      extra={
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      }
    >
      <CustomerForm />
      <Viewer />
    </Card>
  );
};
export default RxImmerDemo;
