/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Dashboard from './dashboard'
import * as todoApi from '../../lib/api/todo' // Import the todo API

// Mocking react-toast-notifications
jest.mock('react-toast-notifications', () => ({
  useToasts: () => ({
    addToast: jest.fn(),
  }),
}))

// Mocking useGetTodosQuery hook
jest.mock('../../lib/api/todo', () => ({
  ...jest.requireActual('../../lib/api/todo'), // Importing the actual implementation for other hooks
  todoEndpoints: {
    useGetTodosQuery: jest.fn(),
    useAddTodoMutation: jest.fn(),
    useEditTodoMutation: jest.fn(),
    useDeleteTodoMutation: jest.fn(),
  },
}))

// Mocking react-modal
jest.mock('react-modal', () => {
  return {
    ...jest.requireActual('react-modal'),
    setAppElement: () => {},
  }
})

describe('Dashboard Component', () => {
  it('renders with dark mode', () => {
    todoApi.todoEndpoints.useGetTodosQuery.mockReturnValueOnce({
      data: { todos: [] },
      isFetching: false,
    })
    const { getByText } = render(<Dashboard darkMode t={() => {}} />)
    expect(getByText('All task')).toBeInTheDocument()
  })

  it('renders with light mode', () => {
    todoApi.todoEndpoints.useGetTodosQuery.mockReturnValueOnce({
      data: { todos: [] },
      isFetching: false,
    })
    const { getByText } = render(<Dashboard darkMode={false} t={() => {}} />)
    expect(getByText('All task')).toBeInTheDocument()
  })

  it('toggles modal when new task button is clicked', () => {
    todoApi.todoEndpoints.useGetTodosQuery.mockReturnValueOnce({
      data: { todos: [] },
      isFetching: false,
    })
    const { getByText, getByAltText } = render(
      <Dashboard darkMode t={() => {}} />
    )
    fireEvent.click(getByAltText('add'))
    expect(getByText('Todo')).toBeInTheDocument()
  })

  it('submits form with valid todo', async () => {
    todoApi.todoEndpoints.useGetTodosQuery.mockReturnValueOnce({
      data: { todos: [] },
      isFetching: false,
    })
    const { getByLabelText, getByText } = render(
      <Dashboard darkMode t={() => {}} />
    )
    fireEvent.change(getByLabelText('Todo'), { target: { value: 'New todo' } })
    fireEvent.click(getByText('Submit'))
    await waitFor(() =>
      expect(getByText('Todo addedd Successfully')).toBeInTheDocument()
    )
  })
})
