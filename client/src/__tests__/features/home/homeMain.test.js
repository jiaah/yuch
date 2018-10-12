import React from 'react';
import { shallow } from 'enzyme';
import HomeMain from '../../../features/home/homeMain';

it('should render Header correctly', () => {
  const wrapper = shallow(<HomeMain />);
  expect(wrapper).toMatchSnapshot();
});
