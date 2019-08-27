import { createMemoryHistory } from 'history';
import { renderWithRouter } from '../../../util';
import * as authAction from '../../../../actions/authAction';
import { Login } from '../../../../components/auth/login/loginContainer';
import React, {
  cleanup,
  fireEvent,
  queryByAttribute,
  wait,
} from '../../../setupTests';
import * as data from '../../../__mocks__/mockData';

const { username, password, id, token, companyName, isAdmin } = data;

afterEach(cleanup);

const fakeUserResponse = {
  id,
  token,
  companyName,
  isAdmin,
};
const mockUserLogin = jest
  .spyOn(authAction, 'userLogin')
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse),
    }),
  );

const history = createMemoryHistory();

const keepMeLoggedIn = jest.fn();
const addFlashMessage = jest.fn();

const defaultProps = {
  history,
  userData: [],
  userLogin: mockUserLogin,
  addFlashMessage,
  keepMeLoggedIn,
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = renderWithRouter(<Login {...setupProps} />, {
    route: '/login',
  });
  const { container, history } = component;
  const getByName = queryByAttribute.bind(null, 'name');
  const getByType = queryByAttribute.bind(null, 'type');
  const usernameInput = getByName(container, 'username');
  const passwordInput = getByName(container, 'password');
  const submitButton = getByType(container, 'submit');
  return {
    component,
    history,
    submitButton,
    usernameInput,
    passwordInput,
  };
};

it('redirects to homepage on login submit success', async () => {
  const { submitButton, usernameInput, passwordInput } = setUp({
    keepUserLoggedIn: false,
  });
  const location = history.location;

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });

  expect(localStorage.getItem('token')).toBeNull();

  fireEvent.click(submitButton);
  await wait(() => {
    expect(mockUserLogin).toHaveBeenCalledTimes(1);
  });

  await wait(() => {
    expect(localStorage.getItem('token')).not.toBeNull();
    expect(sessionStorage.getItem('keepUserLoggedIn')).toBe('false');
  });

  const unlisten = history.listen(expect(location.pathname).toMatch('/'));
  unlisten();
});
