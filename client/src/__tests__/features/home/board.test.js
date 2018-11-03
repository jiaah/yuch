import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from '../../../features/home/board';

describe('<Board />', () => {
  const wrapper = shallow(<Board />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('sets initial state', () => {
    expect(wrapper.state().lastScrollY).toBe(0);
  });

  describe('when mouted', () => {
    beforeEach(() => {
      // wrapper = mount(<Board {...props} />);
      wrapper.setState({ lastScrollY: 1010 });
    });

    afterEach(() => {
      wrapper.setState({ lastScrollY: 0 });
    });

    it('laods Map on scroll down', () => {
      expect(wrapper.find('LoadableComponent').exists()).toBe(true);
    });
  });
});
