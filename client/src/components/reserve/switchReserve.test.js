import React from 'react';
import { shallow } from 'enzyme';
import SwitchReserve from './switchReserve';

describe('<switchReserve />', () => {
  it('render reserve form when api request not made', () => {
    const wrapper = shallow(<SwitchReserve apiRequest="" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('WithStyles(ReserveForm)').exists()).toBe(true);
  });

  it('render reserve request resolved text when api request is made', () => {
    const wrapper = shallow(<SwitchReserve apiRequest="success" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ReserveResolvedText').exists()).toBe(true);
  });
});
