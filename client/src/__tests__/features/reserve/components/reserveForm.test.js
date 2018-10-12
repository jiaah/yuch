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

  describe('when typeing into inputs', () => {
    describe('name', () => {
      const ev = { target: { id: 'name', value: 'Yuchung' } };

      beforeEach(() => {
        wrapper.find('.input-name').simulate('change', ev);
      });

      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });

    describe('contact', () => {
      const ev = { target: { id: 'contact', value: '123123123' } };

      beforeEach(() => {
        wrapper.find('.input-contact').simulate('change', ev);
      });
      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });

    describe('number', () => {
      const ev = { target: { id: 'number', value: '100' } };

      beforeEach(() => {
        wrapper.find('.input-number').simulate('change', ev);
      });
      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });

    describe('place', () => {
      const ev = { target: { id: 'place', value: 'Gyeongju' } };

      beforeEach(() => {
        wrapper.find('.input-place').simulate('change', ev);
      });
      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });

    describe('date', () => {
      const ev = { target: { id: 'date', value: '2019-12-25' } };

      beforeEach(() => {
        wrapper.find('.input-date').simulate('change', ev);
      });
      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });

    describe('time', () => {
      const ev = { target: { id: 'time', value: '2:30 PM' } };

      beforeEach(() => {
        wrapper.find('.input-time').simulate('change', ev);
      });
      it('calls save Reserve Info callback', () => {
        expect(mockChange).toHaveBeenCalledWith(ev);
      });
    });
  });

  describe('when clicking reserve complete button', () => {
    const mockedEvent = { target: {} };
    const { now } = mockData;

    beforeEach(() => {
      wrapper.find('.btn-reserve').simulate('click', mockedEvent, now);
    });
    it('calls save Reserve Info callback', () => {
      expect(mockSave).toHaveBeenCalledWith(mockedEvent, now);
    });
  });

  describe('when clicking close button', () => {
    beforeEach(() => {
      wrapper.find('.btn-close').simulate('click');
    });
    it('calls save Reserve Info callback', () => {
      expect(mockClose).toHaveBeenCalledWith();
    });
  });
});
