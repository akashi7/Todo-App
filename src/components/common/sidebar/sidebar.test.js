/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SideBar from './sidebar';

describe('SideBar component', () => {
  it('renders correctly with light mode', () => {
  const { getByAltText, queryByAltText,getByTestId } = render(<SideBar modal={false} toogleModal={() => {}} darkMode={false} />);
  
  expect(getByAltText('main')).toBeInTheDocument();

  expect(getByAltText('home')).toBeInTheDocument();
  expect(getByAltText('file')).toBeInTheDocument();
  expect(getByAltText('notification')).toBeInTheDocument();
  expect(getByTestId('folder')).toBeInTheDocument();

  expect(getByAltText('settings')).toBeInTheDocument();
  expect(getByAltText('profile')).toBeInTheDocument();
});

it('renders correctly with dark mode', () => {
  const { getByAltText, queryByAltText,getByTestId } = render(<SideBar modal={false} toogleModal={() => {}} darkMode={true} />);
  
  expect(getByAltText('main')).toBeInTheDocument();

  expect(getByAltText('home')).toBeInTheDocument();
  expect(getByAltText('file')).toBeInTheDocument();
  expect(getByAltText('notification')).toBeInTheDocument();
  expect(getByTestId('folder')).toBeInTheDocument();

  expect(getByAltText('settings')).toBeInTheDocument();
  expect(getByAltText('profile')).toBeInTheDocument();

  expect(queryByAltText('people')).not.toBeInTheDocument();
});

it('toggles modal on click', () => {
  const { getByTestId } = render(<SideBar modal={false} toggleModal={jest.fn()} darkMode={false} />);

  fireEvent.click(getByTestId('folder'));

  expect(getByTestId('folder')).toHaveClass('modal-open');
});




});
