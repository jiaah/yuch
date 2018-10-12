import React from 'react';
import { shallow } from 'enzyme';
import Buttons from '../../../../shared/buttons';
import ReserveContainer, {
  Unwrapped as UnwrappedReserveContainer,
} from '../../../../features/reserve/components/reserveContainer';
import ReserveForm from '../../../../features/reserve/components/reserveForm';

describe('<ReserveContainer />', () => {
  const setup = () => {
    const props = {
      show: false,
      variantValue: 'contained',
      colorValue: 'secondary',
      classNameVlue: 'bigButton',
      name: '예약하기',
    };

    const wrapper = shallow(<UnwrappedReserveContainer {...props} />);

    return { props, wrapper };
  };

  const { wrapper } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initializes reserve related state', () => {
    // expect(wrapper.state()).toEqual({data.initialState})
    // this test was done when action testing
  });

  describe('when clicking reserve button', () => {
    beforeEach(() => {
      wrapper.find(Buttons).simulate('click');
    });
    afterEach(() => {
      // wrapper.setState({show: false})
    });
    it('calls handleOpen callback', () => {});
    it('changes show state on button click event', () => {
      // expect.(wrapper.state().show).toEqual(true)
    });
    it('creates a reserve Modal component', () => {
      // expect(wrapper.find('SimpleModal').exists()).toBe(true);
    });
  });
});
