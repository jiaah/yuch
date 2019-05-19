import React from 'react';
import { render } from '../../__tests__/setupTests';
import HomeMain from './homeMain';

test('<HomeMain /> renders properly', () => {
  const { container } = render(<HomeMain />);
  expect(container.firstChild).toMatchSnapshot();
});
