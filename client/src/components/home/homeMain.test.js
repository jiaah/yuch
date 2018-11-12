import React from 'react';
import { shallow } from 'enzyme';
import HomeMain from './homeMain';

describe('<HomeMain />', () => {
  const wrapper = shallow(<HomeMain />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains images', () => {
    expect(wrapper.find('img').props().src).toBe('text-file-stub');
  });

  it('contains link', () => {
    expect(wrapper.find('a').props().href).toBe(
      'http://www.xn--0z2bz4lsqjfrj.com/',
    );
  });
});
