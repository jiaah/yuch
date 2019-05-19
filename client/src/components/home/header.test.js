import React from 'react';
import { render } from '../../__tests__/setupTests';
import Header from './header';

test('<Header /> renders correctly', () => {
  const { container } = render(<Header />);
  expect(container.firstChild).toMatchSnapshot();
});
