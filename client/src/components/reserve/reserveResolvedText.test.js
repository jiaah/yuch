import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import ReserveResolvedText from './reserveResolvedText';

describe('<reserveResolvedText />', () => {
  const handleClose = jest.fn();
  const ComponentNaked = unwrap(ReserveResolvedText);

  const props = {
    apiRequest: 'null',
    handleClose,
    classes: {
      button: {
        margin: '',
        width: '6em',
        paddingTop: '5px',
        paddingBottom: '5px',
      },
    },
  };

  const wrapper = shallow(<ComponentNaked {...props} />);

  it('display nothing on null', () => {
    wrapper.setProps({ apiRequest: null });
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('should contain Button component', () => {
    expect(wrapper.find('WithStyles(Button)').exists()).toBeTruthy();
  });

  describe('when reservation request is successfully made', () => {
    beforeEach(() => {
      wrapper.setProps({ apiRequest: 'success' });
    });

    it('should contain success text', () => {
      expect(wrapper.find('p').text()).toBe(
        '예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, 유청으로 연락주시길 바랍니다.',
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when reservation request is failed', () => {
    beforeEach(() => {
      wrapper.setProps({ apiRequest: 'error' });
    });

    it('should contain error text', () => {
      expect(wrapper.find('p').text()).toBe(
        '프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다. 상담전화  (054) 745 - 0999',
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when close button clicked, hanldeClose function should be called', () => {
    beforeEach(() => {
      wrapper.find('WithStyles(Button)').simulate('click');
    });

    it('click event should exists', () => {
      expect(handleClose.mock.calls).toHaveLength(1);
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
