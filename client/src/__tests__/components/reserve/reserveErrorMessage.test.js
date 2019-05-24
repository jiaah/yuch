import React from 'react';
import { render, cleanup } from '../../setupTests';
import ReserveErrorMessage from '../../../components/reserve/reserveErrorMessage';

afterEach(cleanup);

const setUp = () => {
  const component = render(<ReserveErrorMessage />);
  return component;
};

test('<ReserveErrorMessage />', () => {
  const { getByTestId } = setUp();
  expect(getByTestId('reserve-message--error')).toHaveTextContent(
    '프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다.',
  );
});
