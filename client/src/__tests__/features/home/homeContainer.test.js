import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer from '../../../features/home/homeContainer';

describe('<HomeContainer />', () => {
  const wrapper = shallow(<HomeContainer />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
