import React from 'react';
import { render, cleanup } from '../../setupTests';
import Board from '../../../components/home/board';

afterEach(cleanup);

const setup = (state = { lastScrollY: 0 }) => render(<Board {...state} />);

test('should render successfully', () => {
  const { container } = setup();
  expect(container.firstChild).toMatchSnapshot();
});

test('should render naver map properly', async () => {
  const map = {};
  global.window.addEventListener = jest.fn((event, handler) => {
    map[event] = handler;
  });
  const wrapper = setup();
  map.scroll({ scrollY: 1200 });
  expect(global.window.addEventListener).toHaveBeenCalled();
});

test('should remove event listener when component unmounts ', () => {
  const removeEventListenerSpy = jest.spyOn(
    global.window,
    'removeEventListener',
  );
  const wrapper = setup();
  wrapper.unmount();
  expect(removeEventListenerSpy).toHaveBeenCalled();
});
