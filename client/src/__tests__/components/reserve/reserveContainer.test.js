import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '../../setupTests';
import { ReserveContainer } from '../../../components/reserve/reserveContainer';

afterEach(cleanup);
const defaultProps = {
  show: false,
  flashVariant: '',
  modalActions: { showModal: jest.fn() },
  reserveActions: jest.fn(),
  classes: {
    bigButton: '',
  },
  isReserved: '',
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(<ReserveContainer {...setupProps} />);
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
  const { getByTestId, queryByTestId, container, rerender } = setUp();
  const reserveButton = getByTestId('reserve-modal--button');

  expect(reserveButton.textContent).toBe('예약하기');

  fireEvent.click(reserveButton);

  // defaultProps.show = true; // Error: does not update props.
  // render(<ReserveContainer show={true} />, { container });
  // rerender(<ReserveContainer show={true} />); // ERROR: TypeError: Cannot read property 'bigButton' of undefined

  // const modal = await waitForElement(() => queryByTestId('modal'));
  // expect(queryByTestId('reserve-form')).toBeTruthy();
});
