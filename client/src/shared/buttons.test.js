import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import Buttons from './buttons';

describe('material ui button', () => {
  const UnrappedButton = unwrap(Buttons);
  const handleClickMock = jest.fn();

  const setup = () => {
    const props = {
      classes: {
        button: {
          width: '6em',
          paddingTop: '5px',
          paddingBottom: '5px',
        },
        bigButton: {
          width: '8em',
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      },
      variantValue: 'contained',
      colorValue: 'secondary',
      classNameVlue: 'bigButton',
      name: '예약하기',
      handleClick: handleClickMock,
    };
    const wrapper = shallow(
      <UnrappedButton {...props} onClick={handleClickMock} />,
    );
    return { props, wrapper };
  };

  const { wrapper } = setup();

  it('display button correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('click event should exists', () => {
    wrapper.find(Button).simulate('click');
    expect(handleClickMock.mock.calls).toHaveLength(1);
    expect(handleClickMock).toHaveBeenCalled();
  });
});
