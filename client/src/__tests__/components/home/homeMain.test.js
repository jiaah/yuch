import React from 'react';
import { render, cleanup } from '../../setupTests';
import HomeMain from '../../../components/home/homeMain';

afterEach(cleanup);

const setUp = () => render(<HomeMain />);

test('<HomeMain /> renders properly', () => {
  const { container } = setUp();
  expect(container.firstChild).toMatchSnapshot();
});

test('images and links have proper path', () => {
  const { getByTestId, queryByTestId } = setUp();

  // image
  expect(getByTestId('img-delivery').getAttribute('src')).toBe('delivery.jpg');
  expect(queryByTestId('img-localfood').getAttribute('data-src')).toBe(
    'localfood.jpg',
  );
  expect(queryByTestId('img-sesame').getAttribute('data-src')).toBe(
    'sesame.jpg',
  );
  expect(queryByTestId('img-women').getAttribute('data-src')).toBe('women.jpg');

  // link
  expect(getByTestId('sesame-link').getAttribute('href')).toBe(
    'http://www.xn--0z2bz4lsqjfrj.com/',
  );
});
