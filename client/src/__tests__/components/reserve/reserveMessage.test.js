import React from 'react';
import { render, cleanup } from '../../setupTests';
import ReserveMessage from '../../../components/reserve/reserveMessage';

afterEach(cleanup);

const setUp = () => {
  const component = render(<ReserveMessage isReserved="" />);
  return component;
};

test('Display success message on submit success', () => {
  const { getByTestId, rerender } = setUp();
  rerender(<ReserveMessage isReserved="success" />);
  expect(getByTestId('reserve-message')).toHaveTextContent(
    '예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, 유청으로 연락주시길 바랍니다.',
  );
});

test('Show ReserveErrorMessage component on submit fail', () => {
  const { getByTestId, rerender } = setUp();
  rerender(<ReserveMessage isReserved="error" />);
  expect(getByTestId('reserve-message--error')).toBeTruthy();
});
