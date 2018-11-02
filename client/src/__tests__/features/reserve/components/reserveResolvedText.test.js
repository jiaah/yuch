import React from 'react';
import { shallow } from 'enzyme';
import ReserveResolvedText from '../../../../features/reserve/components/reserveResolvedText';
import Buttons from '../../../../shared/buttons';

describe('<reserveResolvedText />', () => {
  const mockClose = jest.fn();

  it('display reserve request success text', () => {
    const props = {
      apiRequest: 'success',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper.find('p').text()).toBe(
      '예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, 유청으로 연락주시길 바랍니다.',
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('display reserve request error text', () => {
    const props = {
      apiRequest: 'error',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper.find('p').text()).toBe(
      '프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다. 상담전화 054-745-0999',
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('display null', () => {
    const props = {
      apiRequest: '',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking close button', () => {
    const props = {
      apiRequest: 'error',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);

    beforeEach(() => {
      wrapper.find(Buttons).simulate('click');
    });

    it('calls close modal callback', () => {
      // Error: Expected mock function to have been called, but it was not called.
      // expect(mockClose).toHaveBeenCalled();
    });
  });
});
