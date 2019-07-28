import React from 'react';
import { queryByAttribute } from 'react-testing-library';
import { ReserveForm } from '../../../components/reserve/reserveForm';
import * as mockData from '../../__mocks__/mockData';
import { render, fireEvent, waitForElement, cleanup } from '../../setupTests';

afterEach(cleanup);

const {
  reserveContents: { name, contact, number, place, date, time, createdAt },
} = mockData;

const mockClose = jest.fn();
const mockChange = jest.fn();
const mockSubmit = jest.fn();

const props = {
  inThreeDays: mockData.inThreeDays,
  handleClose: mockClose,
  handleChange: mockChange,
  handleSubmit: mockSubmit,
  submitBtnClicked: false,
  classes: {},
};

const setup = () =>
  render(<ReserveForm {...props} reserveInfo={mockData.reserveInfoInit} />);

test('submit with reserve Info', async () => {
  const { container } = setup();

  const getById = queryByAttribute.bind(null, 'id');
  const nameInput = getById(container, 'name');

  fireEvent.change(nameInput, { target: { value: 'yuch' } });
  expect(nameInput.value).toBe('yuch');
  // fireEvent.click(submitButton);
  // expect(mockSubmit).toHaveBeenCalledTimes(1);
  // expect(mockSubmit).toHaveBeenCalledWith({...});
  // const submitButton = getByText('예약완료');
});
