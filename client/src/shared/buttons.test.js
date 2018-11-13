import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import Buttons from './buttons';

describe('material ui button', () => {
  const UnrappedButton = unwrap(Buttons);
  const handleClick = jest.fn();

  const setup = () => {
    const props = {
      classes: {
        button: {
          width: '6em',
          paddingTop: '5px',
          paddingBottom: '5px',
        },
      },
      variantValue: 'contained',
      colorValue: 'secondary',
      name: '예약하기',
      handleClick,
    };
    const wrapper = shallow(
      <UnrappedButton {...props} onClick={handleClick} />,
    );
    return { props, wrapper };
  };

  const { wrapper } = setup();

  it('display button correctly', () => {
    expect(wrapper.find('WithStyles(Button)').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('click event should exists', () => {
    const ev = {};
    wrapper.find('WithStyles(Button)').simulate('click', ev);
    expect(handleClick.mock.calls).toHaveLength(1);
    expect(handleClick).toHaveBeenCalled();
  });
});
