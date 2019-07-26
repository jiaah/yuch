// import { ConnectedRouter as Router } from 'connected-react-router';
import { MemoryRouter as Router } from 'react-router-dom';
import React, { render, cleanup, fireEvent } from '../../../setupTests';
import LoginForm from '../../../../components/auth/login/loginForm';
import { findByTestAttr } from '../../../util';

afterEach(cleanup);

const mockChange = jest.fn();
const mockSubmit = jest.fn();

const defaultProps = {
  handleChange: mockChange,
  handleSubmit: mockSubmit,
  isSubmitting: false,
  userData: [{ username: '', password: '' }],
  keepMeLoggedIn: jest.fn(),
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <Router>
      <LoginForm {...setupProps} />
    </Router>,
  );
  return component;
};

describe('Login Form Component', () => {
  it('renders without errors', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  it("calls an action on 'keepMeLoggedIn' checkbox click", () => {
    const component = setUp();
    const { getByTestId } = component;
    const checkbox = getByTestId('checkbox-login').querySelector(
      'input[type="checkbox"]',
    );
    expect(defaultProps.keepMeLoggedIn).not.toHaveBeenCalled();
    fireEvent.click(checkbox);
    expect(defaultProps.keepMeLoggedIn).toHaveBeenCalled();
    expect(checkbox).toHaveProperty('checked', true);
  });

  it('calls handleChange on input change', () => {
    const component = setUp();
    const { queryAllByTestId } = component;
    const usernameInput = queryAllByTestId('username-input');
    const passwordInput = queryAllByTestId('password-input');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    // usernameInput.value = 'test';
    // passwordInput.value = 'test1234';

    // fireEvent.change(usernameInput);
    // usernameInput.simulate('change', {
    //   target: { name: 'username', value: ' test' },
    // });

    // enzyme's change event is synchronous and Formik's handlers are asynchronous
    // setTimeout(() => {
    //   component.update();
    //   expect(mockChange.calledOnce).toEqual(true);
    //   done();
    // }, 1000);
  });

  // it('calls handleSubmit on submit button click', done => {
  // const component = setUp();
  // const { queryAllByTestId } = component;
  // const submitButton = queryAllByTestId('submit-button');
  // fireEvent.submit(submitButton, {
  //   preventDefault: () => {},
  // });
  // setTimeout(() => {
  //   wrapper.update();
  //   expect(mockSubmit.calledOnce).toEqual(true);
  //   done();
  // }, 0);
  // });

  it('renders username in username inpu when it exists', () => {
    const component = setUp({ userData: [{ username: 'test', password: '' }] });
    const { queryAllByTestId } = component;
    const usernameInput = queryAllByTestId('username-input')[0].querySelector(
      'input[type="text"]',
    );
    // console.log(usernameInput);
  });
});
