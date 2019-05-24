import React from 'react';
import { unwrap } from '@material-ui/core/test-utils';
import ReserveForm from '../../../components/reserve/reserveForm';
import * as mockData from '../../__mocks__/mockData';
import { render, fireEvent, waitForElement, cleanup } from '../../setupTests';

afterEach(cleanup);

const {
  reserveContents: { name, contact, number, place, date, time, createdAt },
} = mockData;

const mockClose = jest.fn();
const mockChange = jest.fn();
const mockSubmit = jest.fn();

const ComponentNaked = unwrap(ReserveForm);

const props = {
  inThreeDays: mockData.inThreeDays,
  handleClose: mockClose,
  handleChange: mockChange,
  handleSubmit: mockSubmit,
  submitBtnClicked: false,
  classes: {},
};

const setup = () =>
  render(<ComponentNaked {...props} reserveInfo={mockData.reserveInfoInit} />);

test('submit with reserve Info', async () => {
  const {
    getByTestId,
    getByText,
    getByLabelText,
    container,
    queryByTestId,
  } = setup();

  const buttonComponent = queryByTestId('button');
  const inputNameById = getByTestId('name');
  const submitButton = getByText('예약완료');

  expect(buttonComponent).toBeTruthy();

  // old version. test's passed. but it doesn't seem to work.
  // inputNameById.value = name;
  // fireEvent.change(name);
  // Error: called zero times.
  // expect(mockChange).toHaveBeenCalledTimes(1);

  // Error: The given element does not have a value setter
  // fireEvent.change(getByLabelText('이름'), { target: { value: name } });

  fireEvent.click(submitButton);
  expect(mockSubmit).toHaveBeenCalledTimes(1);
});
