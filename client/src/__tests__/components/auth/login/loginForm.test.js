import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { queryByAttribute } from 'react-testing-library';
import React, { render, cleanup, fireEvent } from '../../../setupTests';
import LoginForm from '../../../../components/auth/login/loginForm';
// import { App } from '../../../../../app';

const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

afterEach(cleanup);

const mockSubmit = jest.fn();
const mockKeepMeLoggedIn = jest.fn();

const defaultProps = {
  handleSubmit: mockSubmit,
  isSubmitting: false,
  userData: [],
  keepMeLoggedIn: mockKeepMeLoggedIn,
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <MemoryRouter>
      <LoginForm {...setupProps} onSubmit={mockSubmit} />
    </MemoryRouter>,
  );
  const { container, getByTestId, getByText } = component;
  const getByName = queryByAttribute.bind(null, 'name');
  const usernameInput = getByName(container, 'username');
  const passwordInput = getByName(container, 'password');
  // const getByType = queryByAttribute.bind(null, 'type');
  // const submitButton = getByType(container, 'submit');
  const submitButton = getByText('로그인');
  // const submitButton = getByTestId('form');

  return { component, usernameInput, passwordInput, submitButton };
};

describe('Login Form Component', () => {
  it('renders without errors', () => {
    const { component } = setUp();
    expect(component).toMatchSnapshot();
  });

  it("calls an action on 'keepMeLoggedIn' checkbox click", () => {
    const { component } = setUp();
    const { getByTestId } = component;
    const checkbox = getByTestId('checkbox-login').querySelector(
      'input[type="checkbox"]',
    );
    expect(mockKeepMeLoggedIn).not.toHaveBeenCalled();
    fireEvent.click(checkbox);
    expect(mockKeepMeLoggedIn).toHaveBeenCalled();
    expect(checkbox).toHaveProperty('checked', true);
  });

  it('renders empty string in username input when userData is empty', () => {
    const { usernameInput } = setUp();
    expect(usernameInput.value).toBe('');
  });

  it('renders username in username input when userData is not empty', () => {
    const { usernameInput } = setUp({
      userData: [{ username: 'yuch', password: '' }],
    });
    expect(usernameInput.value).toBe('yuch');
  });

  it('calls handleChange on input change', () => {
    const { usernameInput, passwordInput, submitButton } = setUp();

    fireEvent.change(usernameInput, { target: { value: 'yuch' } });
    expect(usernameInput.value).toBe('yuch');
    fireEvent.change(passwordInput, { target: { value: 'testpwd1234' } });
    expect(passwordInput.value).toBe('testpwd1234');

    // fireEvent.click(submitButton);
    // expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  // it('show error message when login fails on submit button click', () => {
  //   const { submitButton, component } = setUp({
  //     username: 'yuchung',
  //     password: 'falsepassword12',
  //   });
  //   const { getByText } = component;
  //   fireEvent.submit(submitButton);
  //   expect(mockSubmit).toHaveBeenCalled();
  //   expect(
  //     getByText(
  //       '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.',
  //     ),
  //   ).toBeDefined();
  // });
});
