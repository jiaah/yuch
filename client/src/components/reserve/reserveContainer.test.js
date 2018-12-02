import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedReserveContainer } from './reserveContainer';

describe('<ReserveContainer />', () => {
  describe('renders initial reserve section correctly', () => {
    const showModalAction = jest.fn();
    const props = {
      show: false,
      classes: {
        bigButton: {},
      },
      showModalAction,
    };

    const wrapper = shallow(<UnwrappedReserveContainer {...props} />);

    it('renders correctly', () => {
      expect(wrapper.find('WithStyles(Button)').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    describe('when clicking reserve button', () => {
      beforeEach(() => {
        wrapper.find('.btn--reserve-modal').simulate('click');
        wrapper.setProps({ showModal: true });
      });

      afterEach(() => {
        wrapper.setProps({ showModal: false });
      });

      it('showModalAction called', () => {
        expect(showModalAction).toHaveBeenCalled();
      });

      it('load a reserve Modal component', () => {
        expect(wrapper.find('LoadableComponent').exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
