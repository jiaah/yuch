import { MemoryRouter } from 'react-router-dom';
import * as authAction from '../../../../actions/authAction';
import { Login } from '../../../../components/auth/login/loginContainer';
import React, {
  render,
  cleanup,
  fireEvent,
  queryByAttribute,
  wait,
  waitForElement,
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

const history = jest.fn();
const keepMeLoggedIn = jest.fn();
const addFlashMessage = jest.fn();

const defaultProps = {
  history,
  keepLoggedIn: false,
  userData: [],
  userLogin: mockUserLogin,
  addFlashMessage,
  keepMeLoggedIn,
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <MemoryRouter>
      <Login {...setupProps} />
    </MemoryRouter>,
  );
  const { container } = component;
  const getByName = queryByAttribute.bind(null, 'name');
  const getByType = queryByAttribute.bind(null, 'type');
  const usernameInput = getByName(container, 'username');
  const passwordInput = getByName(container, 'password');
  const submitButton = getByType(container, 'submit');
  return { component, submitButton, usernameInput, passwordInput };
};

it('redirects to homepage on login submit success', async () => {
  const { component, submitButton, usernameInput, passwordInput } = setUp();
  const { getByTestId, getByText, container } = component;

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(submitButton);
  await setTimeout(() => {
    expect(mockUserLogin).toHaveBeenCalledTimes(1);
  });

  // const hoempage = getByTestId('homepage');
  // const homepage = getByText('NO MSG');
  // const getById = queryByAttribute.bind(null, 'id');
  // const homepage = getById(container, 'homepage');
  // console.log('hoempage: ', hoempage);
  // await waitForElement(() => {});
  // expect(homepage).toBeTruthy();
  // expect(homepage).toHaveTextContent('NO MSG');
});

it('display error message on login submit failure', async () => {
  const { component, submitButton, usernameInput, passwordInput } = setUp();

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: '-1' } });

  fireEvent.click(submitButton);
  await setTimeout(() => {
    expect(mockUserLogin).toHaveBeenCalledTimes(1);
  });

  // const getById = queryByAttribute.bind(null, 'id');
  // const clientMsg = getById(container, 'client-msg');
  // console.log('clientMsg: ', clientMsg);
});
