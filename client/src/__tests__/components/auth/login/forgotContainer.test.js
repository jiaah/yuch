import { ForgotContainer } from '../../../../components/auth/login/forgotContainer';
import React, { render, cleanup } from '../../../setupTests';

afterEach(cleanup);

const defaultProps = {
  authActions: {
    findUsernameWithEmail: jest.fn(),
    findUsernameWithContact: jest.fn(),
    sendVerificationCodeToEmail: jest.fn(),
  },
  messageActions: { addFlashMessage: jest.fn() },
};

const setUp = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const component = render(<ForgotContainer {...setupProps} />);
  return { component };
};

describe('<forgotContainer />', () => {
  it('renders UsernameFormBox Component when user clicks forgot username button', () => {
    const { component } = setUp({ location: { search: '?value=username' } });
    expect(component).toMatchSnapshot();
  });

  it('renders PasswordFormBox Component when user clicks forgot password button', () => {
    const { component } = setUp({ location: { search: '?value=password' } });
    expect(component).toMatchSnapshot();
  });
});
