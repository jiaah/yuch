import React from 'react';
import { shallow } from 'enzyme';
import Board from '../../../features/home/board';

it('should render Header correctly', () => {
  const wrapper = shallow(<Board />);
  expect(wrapper).toMatchSnapshot();
});
