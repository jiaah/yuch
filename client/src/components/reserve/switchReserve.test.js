import React from 'react';
import { shallow } from 'enzyme';
import SwitchReserve from './switchReserve';

describe('<switchReserve />', () => {
  const props = {
    apiRequest: null,
  };
  const wrapper = shallow(<SwitchReserve {...props} />);

  it('render reserve form when api request not made', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ReserveForm').exists()).toBeTruthy();
  });

  it('render reserve request resolved text when api request is made', () => {
    wrapper.setProps({ apiRequest: 'success' });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find('WithStyles(ReserveResolvedText)').exists(),
    ).toBeTruthy();
  });
});
