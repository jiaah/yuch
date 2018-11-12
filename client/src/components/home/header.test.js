import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';

describe('<Header />', () => {
  const wrapper = shallow(<Header />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain Nav component', () => {
    expect(wrapper.find('withRouter(Connect(Nav))').exists()).toBe(true);
  });
});
