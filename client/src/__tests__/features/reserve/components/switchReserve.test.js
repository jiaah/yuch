import React from 'react';
import { shallow } from 'enzyme';
import SwitchReserve from '../../../../features/reserve/components/switchReserve';

describe('<switchReserve />', () => {
  it('render reserve form when api request not made', () => {
    const wrapper = shallow(<SwitchReserve apiRequest="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render reserve request resolved text when api request is made', () => {
    const wrapper = shallow(<SwitchReserve apiRequest="success" />);
    expect(wrapper).toMatchSnapshot();
  });
});
