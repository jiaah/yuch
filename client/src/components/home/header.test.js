import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';

describe('<Header />', () => {
  const wrapper = shallow(<Header />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h2').text()).toBe(
      'NO MSG!오늘도 열심히 일한 당신에게 당신만을 위한 착한 가격의 집밥을선물하세요.',
    );
  });

  it('should contain Nav component', () => {
    expect(wrapper.find('withRouter(Connect(Nav))').exists()).toBe(true);
  });
});
