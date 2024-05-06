/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'jest-environment-jsdom-global';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import 'regenerator-runtime/runtime'; 
import { store } from '../../lib/redux/store';
import Dashboard from './dashboard';




jest.mock('react-modal', () => {
  return {
    setAppElement: () => {},
    default: ({ children }) => <div>{children}</div>,
  };
});

const mock = new MockAdapter(axios);

mock.onGet('/todos').reply(200, [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
]);




test('renders Dashboard component', async () => {
   render(
    <Provider store={store}>
      <ToastProvider>
      <Dashboard darkMode={false} t={() => {}} />

      </ToastProvider>
    </Provider>
  );


  

  const dashboardTitle = await screen.findByTestId('dashboard-title');
  expect(dashboardTitle).toBeInTheDocument();
  const addTodoButton =  await screen.findByTestId('newtask');

  expect(addTodoButton).toBeInTheDocument();
  userEvent.click(addTodoButton);
});
