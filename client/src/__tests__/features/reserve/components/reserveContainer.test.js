import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedReserveContainer } from '../../../../features/reserve/components/reserveContainer';

describe('<ReserveContainer />', () => {
  describe('renders initial reserve section correctly', () => {
    const props = {
      show: false,
      classes: {
        bigButton: { width: '9em' },
      },
    };

    const wrapper = shallow(<UnwrappedReserveContainer {...props} />);

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when clicking reserve button', () => {
      beforeEach(() => {
        wrapper.find('.btn--reserve-modal').simulate('click');
      });

      afterEach(() => {
        wrapper.setState({ show: false });
      });

      it('call handleOpen function and changes show state to true on button click event', () => {
        // check handleOpen.toHaveBeenCalled();
        expect(wrapper.state().show).toEqual(true);
      });

      it('load a reserve Modal component', () => {
        expect(wrapper.find('LoadableComponent').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
