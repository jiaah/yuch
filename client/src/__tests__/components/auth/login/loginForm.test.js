import { MemoryRouter } from 'react-router-dom';
import React, {
  render,
  cleanup,
  fireEvent,
  queryByAttribute,
  wait,
} from '../../../setupTests';
import LoginForm from '../../../../components/auth/login/loginForm';

afterEach(cleanup);

const mockKeepMeLoggedIn = jest.fn();
const mockSubmit = jest.fn();
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
  const { container } = component;
  const getByName = queryByAttribute.bind(null, 'name');
  const usernameInput = getByName(container, 'username');
  const passwordInput = getByName(container, 'password');
  const getByType = queryByAttribute.bind(null, 'type');
  const submitButton = getByType(container, 'submit');

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

  it('renders input value on input change event', async () => {
    const { usernameInput, passwordInput } = setUp();

    fireEvent.change(usernameInput, { target: { value: 'yuch' } });
    expect(usernameInput.value).toBe('yuch');
    fireEvent.change(passwordInput, { target: { value: 'testpwd1234' } });
    expect(passwordInput.value).toBe('testpwd1234');
  });

  it('calls handleSubmit function on submit button click', async () => {
    const { submitButton } = setUp();

    fireEvent.click(submitButton);
    await wait(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
