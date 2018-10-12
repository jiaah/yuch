import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer from '../../../features/home/homeContainer';

it('should render Header correctly', () => {
  const wrapper = shallow(<HomeContainer />);
  expect(wrapper).toMatchSnapshot();
});
