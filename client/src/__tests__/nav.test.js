import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../features/nav';

test('should render Nav correctly', () => {
  const wrapper = shallow(<Nav startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
