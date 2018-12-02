import React from 'react';
import { shallow, mount } from 'enzyme';
import Map from './map';

describe('<Map />', () => {
  const wrapper = shallow(<Map />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when mounted', () => {});
});
