import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer from './homeContainer';

describe('<HomeContainer />', () => {
  const wrapper = shallow(<HomeContainer />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
