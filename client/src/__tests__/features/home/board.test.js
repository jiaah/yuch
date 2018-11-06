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
    // let spy;
    // beforeEach(() => {

    //   wrapper.setState({ lastScrollY: 1010 });
    // });

    afterEach(() => {
      // wrapper.setState({ lastScrollY: 0 });
      // spy.mockClear();
    });

    it('should call methodName on scroll during componentDidMount', () => {
      // const map = {};
      // window.addEventListener = jest.jest.genMockFn().mockImpl((event, cb) => {
      //   map[event] = cb;
      // });
      // wrapper = mount(<Board />);
      // map.scroll({ pageY: 1010 });
      // expect(wrapper.handleScroll).toHaveBeenCalled();
      // spy = jest.spyOn(global, 'addEventListener');
      // wrapper.instance().handleScroll();
      // expect(spy).toHaveBeenCalled();
    });
    it('should update lastScrollY state', () => {});
    it('laods Map on scroll down', () => {
      // expect(wrapper.find('LoadableComponent').exists()).toBe(true);
    });
  });
});
