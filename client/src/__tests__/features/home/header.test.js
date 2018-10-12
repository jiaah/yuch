import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../features/home/header';

it('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
