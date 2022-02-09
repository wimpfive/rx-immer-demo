import { createRxImmerContext } from 'rx-immer-react';

export const Context = createRxImmerContext(
  {
    books: [
      {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        price: 100,
      },
      {
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        price: 90,
      },
      {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        price: 72,
      },
      {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        price: 88,
      },
    ],
  },
  { history: false },
);
