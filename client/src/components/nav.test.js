import React from 'react';
import { shallow } from 'enzyme';
import Nav from './nav';

test('should render Nav correctly', () => {
  const wrapper = shallow(<Nav startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

// test('should call startLogout on button click', () => {
//   const startLogout = jest.fn();
//   const wrapper = shallow(<Nav startLogout={startLogout} />);
//   wrapper.find('button').simulate('click');
//   expect(startLogout).toHaveBeenCalled();
// });
