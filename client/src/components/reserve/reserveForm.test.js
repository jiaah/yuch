import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import ReserveForm from './reserveForm';
import * as mockData from '../../__tests__/__mocks__/mockData';

describe('<ReserveForm />', () => {
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

  describe('with initial reserve info', () => {
    const wrapper = shallow(
      <ComponentNaked {...props} reserveInfo={mockData.reserveInfoInit} />,
    );

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('creates inputs', () => {
      expect(wrapper.find('.input-name').exists()).toBe(true);
      expect(wrapper.find('.input-contact').exists()).toBe(true);
      expect(wrapper.find('.input-number').exists()).toBe(true);
      expect(wrapper.find('.input-place').exists()).toBe(true);
      expect(wrapper.find('.input-date').exists()).toBe(true);
      expect(wrapper.find('.input-time').exists()).toBe(true);
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

    // describe('clicking a button', () => {
    //   describe('submit button', () => {
    //     const mockedEvent = { target: {} };
    //     beforeEach(() => {
    //       wrapper.find('.btn-submit').simulate('click', mockedEvent);
    //     });

    //     it('handle submit function', () => {
    //       expect(mockSubmit).toHaveBeenCalledWith(mockedEvent);
    //     });
    //   });

    //   it('close button', () => {
    //     wrapper.find('.btn-close').simulate('click');
    //     expect(mockClose).toHaveBeenCalledWith();
    //   });
    // });
  });

  describe('throwing error for an empty input value on submit', () => {
    // const mockedEvent = { target: {} };

    describe('should show error when input field is empty', () => {
      const setup = () => {
        const wrapper = shallow(
          <ComponentNaked
            {...props}
            reserveInfo={{
              name: '',
              contact: '(0  )    -    ',
              number: '',
              place: '',
              date: '',
              time: '',
              createdAt: '',
            }}
          />,
        );
        return { wrapper };
      };

      const { wrapper } = setup();

      beforeEach(() => {
        // wrapper.find('.btn-submit').simulate('click', mockedEvent);
        wrapper.setProps({ submitBtnClicked: true });
      });

      it('when name field is empty', () => {
        expect(
          wrapper
            .find('.input-name')
            .first()
            .props().error,
        ).toEqual(true);
      });

      it('when number field is empty', () => {
        expect(
          wrapper
            .find('.input-number')
            .first()
            .props().error,
        ).toEqual(true);
      });

      it('when place field is empty', () => {
        expect(
          wrapper
            .find('.input-place')
            .first()
            .props().error,
        ).toEqual(true);
      });

      it('when time field is empty', () => {
        expect(
          wrapper
            .find('.input-time')
            .first()
            .props().error,
        ).toEqual(true);
      });

      it('when date field is empty', () => {
        expect(
          wrapper
            .find('.input-date')
            .first()
            .props().error,
        ).toEqual(true);
      });
    });
  });
});
