import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import ReserveForm from '../../../../features/reserve/components/reserveForm';
import * as mockData from '../../../__mocks__/mockData';

describe('<ReserveForm />', () => {
  const mockClose = jest.fn();
  const mockChange = jest.fn();
  const mockSave = jest.fn();

  const ComponentNaked = unwrap(ReserveForm);

  const props = {
    reserveInfo: mockData.reserveInfoInit,
    handleClose: mockClose,
    handleChange: mockChange,
    handleSave: mockSave,
    classes: {},
  };
  const wrapper = shallow(<ComponentNaked {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when typeing into input, calls a callback function', () => {
    it('name', () => {
      const ev = { target: { id: 'name', value: 'Yuchung' } };
      wrapper.find('.input-name').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });

    it('contact', () => {
      const ev = { target: { id: 'contact', value: '123123123' } };
      wrapper.find('.input-contact').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });

    it('number', () => {
      const ev = { target: { id: 'number', value: '100' } };
      wrapper.find('.input-number').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });

    it('place', () => {
      const ev = { target: { id: 'place', value: 'Gyeongju' } };
      wrapper.find('.input-place').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });

    it('date', () => {
      const ev = { target: { id: 'date', value: '2019-12-25' } };
      wrapper.find('.input-date').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });

    it('time', () => {
      const ev = { target: { id: 'time', value: '2:30 PM' } };
      wrapper.find('.input-time').simulate('change', ev);
      expect(mockChange).toHaveBeenCalledWith(ev);
    });
  });

  describe('when clicking button, calls a callback function', () => {
    const mockedEvent = { target: {} };
    const { now } = mockData;

    it('reserve button', () => {
      wrapper.find('.btn-reserve').simulate('click', mockedEvent, now);
      expect(mockSave).toHaveBeenCalledWith(mockedEvent, now);
    });

    it('close button', () => {
      wrapper.find('.btn-close').simulate('click');
      expect(mockClose).toHaveBeenCalledWith();
    });
  });
});
