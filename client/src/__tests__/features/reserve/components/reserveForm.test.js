import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import ReserveForm from '../../../../features/reserve/components/reserveForm';
import * as mockData from '../../../__mocks__/mockData';

describe('<ReserveForm />', () => {
  const mockClose = jest.fn();
  const mockChange = jest.fn();
  const mockSubmit = jest.fn();

  const ComponentNaked = unwrap(ReserveForm);

  describe('with initial reserve info', () => {
    const props = {
      reserveInfo: mockData.reserveInfoInit,
      inThreeDays: mockData.inThreeDays,
      handleClose: mockClose,
      handleChange: mockChange,
      handleSubmit: mockSubmit,
      classes: {},
    };
    const wrapper = shallow(<ComponentNaked {...props} />);

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

    describe('clicking a button', () => {
      describe('submit button', () => {
        const mockedEvent = { target: {} };
        beforeEach(() => {
          wrapper.find('.btn-submit').simulate('click', mockedEvent);
        });

        it('handle submit function', () => {
          expect(mockSubmit).toHaveBeenCalledWith(mockedEvent);
        });
      });

      it('close button', () => {
        wrapper.find('.btn-close').simulate('click');
        expect(mockClose).toHaveBeenCalledWith();
      });
    });
  });

  // describe('throwing error for an empty input value on submit', () => {
  //   describe('name value empty', () => {
  //     const setup = () => {
  //       const props = {
  //         inThreeDays: mockData.inThreeDays,
  //         handleClose: mockClose,
  //         handleChange: mockChange,
  //         handleSubmit: mockSubmit,
  //         submitBtnClicked: false,
  //         classes: {},
  //       };

  //       const wrapper = shallow(
  //         <ComponentNaked
  //           {...props}
  //           reserveInfo={{
  //             name: '',
  //             contact: '(010)2542-1222',
  //             number: '60',
  //             place: '경주 교회',
  //             date: '2019-11-11',
  //             time: '12:30',
  //             createdAt: '2019-11-09, 01:00 PM',
  //           }}
  //         />,
  //       );
  //       const mockedEvent = { target: {} };

  //       return { wrapper, props, mockedEvent };
  //     };

  //     beforeEach(() => {
  //       const { wrapper, props, mockedEvent } = setup();

  //       wrapper.find('.btn-submit').simulate('click', mockedEvent);
  //       console.log(props.reserveInfo);
  //     });

  //     it('return submitBtnClicked state true', () => {
  //       // console.log(setup().props().submitBtnClicked);
  //       // expect(wrapper.props().submitBtnClicked).toEqual(true);
  //     });

  //     it('throw the name error', () => {
  //       // expect(wrapper.find('#name').props().error).toEqual(true);
  //     });
  //   });
  // });
});
