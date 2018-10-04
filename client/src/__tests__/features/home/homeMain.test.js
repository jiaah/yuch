import React from 'react';
import { shallow } from 'enzyme';
import HomeMain from '../../../features/home/homeMain';

test('should render Header correctly', () => {
  const wrapper = shallow(<HomeMain />);
  expect(wrapper).toMatchSnapshot();
});
