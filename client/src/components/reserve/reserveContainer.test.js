import React from 'react';
import { render, cleanup, fireEvent } from '../../__tests__/setupTests';
import { Unwrapped as UnwrappedReserveContainer } from './reserveContainer';

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

describe('<ReserveContainer />', () => {
  it('renders properly', () => {
    const { getByTestId } = setUp();
    const reserveTitle = getByTestId('reserve-title');
    const reserveButton = getByTestId('reserve-modal--button');

    expect(reserveTitle.textContent).toBe('Reservation');
    expect(reserveButton.textContent).toBe('예약하기');
  });

  it('open modal on button click', () => {
    const { getByTestId, queryByTestId } = setUp();
    debug();
    const reserveButton = getByTestId('reserve-modal--button');
    const modal = queryByTestId('modal');

    expect(reserveButton.textContent).toBe('예약하기');

    fireEvent.click(reserveButton);
    // ReferenceError: rerender is not defined
    // rerender(<UnwrappedReserveContainer show={true} />);
    // expect(modal).toBeTruthy();
  });

  it('call reserve action on submit button click', () => {
    // Q) should it be done in reserveForm.test.js where there is a button tag?
  });
});
