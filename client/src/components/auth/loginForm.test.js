import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedLoginForm } from './loginForm';
import { findByTestAttr } from '../../utils/test';

const mockChange = jest.fn();
const mockSubmit = jest.fn();
const mockBlur = jest.fn();

const setUp = (props = {}) => {
  const component = shallow(<UnwrappedLoginForm {...props} />);
  return component;
};

describe('Login Form Component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      values: { username: '', password: '' },
      errors: { username: false, password: false },
      touched: { username: false, password: false },
      handleChange: mockChange,
      handleSubmit: mockSubmit,
      isSubmitting: false,
      handleBlur: mockBlur,
      classes: {
        textField: '',
      },
    };

    wrapper = setUp(props);
  });

  it('It should render without errors', () => {
    expect(wrapper).toMatchSnapshot();
    const loginformComponent = findByTestAttr(wrapper, 'loginformComponent');
    expect(loginformComponent).toHaveLength(1);
  });

  it('It should render textfield and button', () => {
    const textfield = wrapper.find('TextField');
    expect(textfield).toHaveLength(2);

    const button = wrapper.find('WithStyles(FormButton)');
    expect(button).toHaveLength(1);
  });

  describe('It should show helperText and error when errors and touched are true', () => {
    beforeEach(() => {
      wrapper.setProps({
        errors: { username: true, password: true },
        touched: { username: true, password: true },
      });
    });

    it('username', () => {
      const textField = wrapper.find(`[data-test='username-input']`);
      // expect(textField.props().helperText).toEqual(true);
      expect(textField.props().error).toEqual(true);
    });
    it('password', () => {
      const textField = wrapper.find(`[data-test='password-input']`);
      // expect(textField.props().helperText).toEqual(true);
      expect(textField.props().error).toEqual(true);
    });
  });

  describe('It should NOT show helperText and error if one of errors and touched is not true', () => {
    beforeEach(() => {
      wrapper.setProps({
        errors: { username: false, password: true },
        touched: { username: true, password: false },
      });
    });

    it('username', () => {
      const textField = wrapper.find(`[data-test='username-input']`);
      // expect(textField.props().helperText).toEqual(false);
      expect(textField.props().error).toEqual(false);
    });
    it('password', () => {
      const textField = wrapper.find(`[data-test='password-input']`);
      // expect(textField.props().helperText).toEqual(false);
      expect(textField.props().error).toEqual(false);
    });
  });

  describe('If the value is false or undefined', () => {
    beforeEach(() => {
      wrapper.setProps({
        values: { username: false, password: undefined },
      });
    });

    it('Value should have an empty string', () => {
      const usernameTextField = findByTestAttr(wrapper, 'username-input');
      const passwordTextField = findByTestAttr(wrapper, 'password-input');
      expect(usernameTextField.props().value).toEqual('');
      expect(passwordTextField.props().value).toEqual('');
    });
  });

  describe('When submit button is clicked', () => {
    beforeEach(() => {
      // wrapper.find('form').simulate('submit', { preventDefault() {} });
    });
  });

  it('call submit function', () => {
    // expect(mockSubmit).toHaveBeenCalledTimes(1);
    // expect(submitBtn.prop(isSubmitting)).toBe(true);
  });
});
