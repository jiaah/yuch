import React from 'react';
import { mount } from 'enzyme';
import Board from './board';

describe('<Board />', () => {
  const setup = (props = {}) => mount(<Board {...props} />);

  it('should render successfully', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it('should update "lastScrollY" in state when compnent mounts', () => {
    const map = {};
    global.window.addEventListener = jest.fn((event, handler) => {
      map[event] = handler;
    });
    const Component = setup();

    global.window.scrollY = 200;
    map.scroll({ scrollY: 200 });

    expect(global.window.addEventListener).toHaveBeenCalled();
    expect(Component.instance().state.lastScrollY).toBe(200);
  });

  it('should remove event listener when component unmounts ', () => {
    const removeEventListenerSpy = jest.spyOn(
      global.window,
      'removeEventListener',
    );
    const Component = setup();
    Component.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
