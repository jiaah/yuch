import React from 'react';
import { mount } from 'enzyme';
import Board from './board';

describe('<Board />', () => {
  const setup = (props = {}) => mount(<Board {...props} />);

  it('should render successfully', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it('should render contents correctly', () => {
    const component = setup();
    expect(
      component
        .find('h3')
        .at(0)
        .text(),
    ).toBe('- Hours -');
    expect(
      component
        .find('p')
        .at(0)
        .text(),
    ).toBe('평일공휴일/주말');
    expect(
      component
        .find('p')
        .at(1)
        .text(),
    ).toBe(
      '중식  11 : 30 - 13 : 30석식  16 : 30 - 18 : 00중식  11 : 30 - 13 : 30',
    );
    expect(
      component
        .find('h3')
        .at(1)
        .text(),
    ).toBe('- Contact -');
    expect(
      component
        .find('p')
        .at(2)
        .text(),
    ).toBe('경주시 황성동 1071-1번지용강공단 내 강남골프장 맞은 편');
    expect(component.find('a').text()).toBe(
      '054 .  745  . 0999010 . 8034 . 0057',
    );
    expect(component.find('footer').text()).toBe(
      '© 2018 | All right reserved | YUCH',
    );
  });

  describe('should render naver map properly', () => {
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
});
