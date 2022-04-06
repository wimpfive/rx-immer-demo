import { create } from 'rx-immer-react';

const store = create({
  data: {
    name: 'new user',
    password: 1234566,
    formData: {
      name: 'k',
      password: 123567,
      formData: {
        name: 'm',
        password: 123567,
      },
    },
  },
  1: 1,
});

export const formData = store.sub('data.formData.formData');

export default store;
