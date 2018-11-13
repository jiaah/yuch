import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedSimpleModal } from './simpleModal';

describe('<SimpleModal />', () => {
  const props = {
    showModal: false,
    classes: { paper: {} },
  };
  const wrapper = shallow(<UnwrappedSimpleModal {...props} />);

  it('should not hide the modal when showModal is false', () => {
    expect(wrapper.find('WithStyles(Modal)').exists()).toBeFalsy();
  });

  describe('should not show the modal when showModal is true', () => {
    beforeEach(() => {
      wrapper.setProps({ showModal: true, component: () => {} });
    });

    it('should contain Modal', () => {
      expect(wrapper.find('WithStyles(Modal)').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correct className', () => {
      expect(
        wrapper
          .find('WithStyles(Modal)')
          .first()
          .props().open,
      ).toEqual(true);
    });
  });
});
