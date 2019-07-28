// import { ConnectedRouter as Router } from 'connected-react-router';
import { MemoryRouter as Router } from 'react-router-dom';
import { queryByAttribute } from 'react-testing-library';
import React, { render, cleanup, fireEvent } from '../../../setupTests';
import LoginForm from '../../../../components/auth/login/loginForm';

afterEach(cleanup);

const mockSubmit = jest.fn();
const mockKeepMeLoggedIn = jest.fn();

const defaultProps = {
  handleUserLogin: mockSubmit,
  isSubmitting: false,
  userData: [],
  keepMeLoggedIn: mockKeepMeLoggedIn,
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <Router>
      <LoginForm {...setupProps} onSubmit={mockSubmit} />
    </Router>,
  );
  const { container } = component;
  const getByName = queryByAttribute.bind(null, 'name');
  const usernameInput = getByName(container, 'username');
  const passwordInput = getByName(container, 'password');
  return { component, usernameInput, passwordInput };
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
    const { usernameInput } = setUp();
    fireEvent.change(usernameInput, { target: { value: 'yuch' } });
    expect(usernameInput.value).toBe('yuch');
  });

  it('calls handleSubmit on submit button click', () => {
    const { component } = setUp();
    const { getByTestId } = component;
    const submitButton = getByTestId('form');
    fireEvent.submit(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
    // check route changes to '/'
    // expect(getAllByTestId('homepage').textContent).toBe('NO MSG');
    // renderWithRouter(<Homepage />, { initialEntries: ['/'] });
  });
});
