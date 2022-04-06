import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { useEffect, useRef } from 'react';
import { formData } from './entity';

const CustomerForm = () => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    const subscription = formData.observe().subscribe((value) => {
      formRef.current?.setFieldsValue(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ProForm
      formRef={formRef}
      onValuesChange={(changedValues, value) => {
        formData.commit((draft: any) => {
          Object.entries(changedValues).forEach(([k, v]) => {
            draft[k] = v;
          });
        });
      }}
    >
      <ProFormText label="name" name="name" />
    </ProForm>
  );
};
343;

export default CustomerForm;
