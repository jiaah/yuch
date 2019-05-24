import React from 'react';
import { render } from '../../setupTests';
import Header from '../../../components/home/header';

test('<Header /> renders correctly', () => {
  const { container } = render(<Header />);
  expect(container.firstChild).toMatchSnapshot();
});
