import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import Buttons from './buttons';

describe('material ui button', () => {
  const UnrappedButton = unwrap(Buttons);
  const handleFirstButtonClick = jest.fn();
  const handleSecondButtonClick = jest.fn();

  const setup = () => {
    const props = {
      classes: {
        button: {
          width: '6em',
          paddingTop: '5px',
          paddingBottom: '5px',
        },
      },

      firstButtonName: '예약하기',
      secondButtonName: '가입하기',
      handleFirstButtonClick,
      handleSecondButtonClick,
    };
    const wrapper = shallow(<UnrappedButton {...props} />);
    return { props, wrapper };
  };

  const { wrapper } = setup();

  describe('first button', () => {
    it('display button correctly', () => {
      expect(wrapper.find('.firstBtn').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('click event should exists', () => {
      const ev = {};
      wrapper.find('.firstBtn').simulate('click', ev);
      expect(handleFirstButtonClick.mock.calls).toHaveLength(1);
      expect(handleFirstButtonClick).toHaveBeenCalled();
    });
  });
  describe('second button', () => {
    it('display button correctly', () => {
      expect(wrapper.find('.secBtn').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('click event should exists', () => {
      const ev = {};
      wrapper.find('.secBtn').simulate('click', ev);
      expect(handleSecondButtonClick.mock.calls).toHaveLength(1);
      expect(handleSecondButtonClick).toHaveBeenCalled();
    });
  });
});
