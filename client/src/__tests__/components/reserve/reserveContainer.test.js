import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '../../setupTests';
import { Unwrapped as UnwrappedReserveContainer } from '../../../components/reserve/reserveContainer';

afterEach(cleanup);
const defaultProps = {
  show: false,
  flashVariant: '',
  modalActions: { showModal: jest.fn() },
  reserveActions: jest.fn(),
  classes: {
    bigButton: '',
  },
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(<UnwrappedReserveContainer {...setupProps} />);
  return component;
};

test('renders properly', () => {
  const { getByTestId } = setUp();
  const reserveTitle = getByTestId('reserve-title');
  const reserveButton = getByTestId('reserve-modal--button');

  expect(reserveTitle.textContent).toBe('Reservation');
  expect(reserveButton.textContent).toBe('예약하기');
});

test('open modal on button click', async () => {
  const { getByTestId, queryByTestId } = setUp();
  const reserveButton = getByTestId('reserve-modal--button');
  const modal = queryByTestId('modal');

  expect(reserveButton.textContent).toBe('예약하기');

  expect(modal).toBeFalsy();
  fireEvent.click(reserveButton);

  defaultProps.show = true;

  // ReferenceError: rerender is not defined
  // Received : null
  // expect(modal).toBeTruthy();
});

test('call reserve action on submit button click', () => {
  // Q) should it be done in reserveForm.test.js where there is a button tag?
});
