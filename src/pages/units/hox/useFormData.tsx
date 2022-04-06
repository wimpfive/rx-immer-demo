import { createModel } from 'hox';
import { useState } from 'react';

const useFormData = () => {
  const [name, setName] = useState<string>('qixian');
  return {
    'input-number': 3,
    'checkbox-group': ['A', 'B'],
    rate: 3.5,
    name,
    setName,
    password: 123456,
    radio: 'a',
    'radio-button': 'a',
    'input-number-range': [2, 4],
  };
};

export default createModel(useFormData);
