/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomModal from './modal';

// Mocking the setAppElement function to avoid errors during testing
jest.mock('react-modal', () => {
  return {
    setAppElement: () => {},
    // Mocking Modal component as well
    __esModule: true,
    default: ({ children }) => <div data-testid="modal">{children}</div>,
  };
});

describe('CustomModal', () => {
  it('renders children and opens when modalIsOpen is true', () => {
    const { getByTestId, getByText } = render(
      <CustomModal modalIsOpen={true} closeModal={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </CustomModal>
    );

    const modalContent = getByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Check if modal is visible
    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  it('closes when closeModal is called', () => {
    const mockCloseModal = jest.fn();
    const { getByTestId } = render(
      <CustomModal modalIsOpen={true} closeModal={mockCloseModal}>
        <div>Modal Content</div>
      </CustomModal>
    );

    const closeBtn = getByTestId('close-btn');
    fireEvent.click(closeBtn);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
