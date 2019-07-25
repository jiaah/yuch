// import { ConnectedRouter as Router } from 'connected-react-router';
import { MemoryRouter as Router } from 'react-router-dom';
import React, { render, cleanup, fireEvent } from '../../../setupTests';
import LoginForm from '../../../../components/auth/login/loginForm';
import { findByTestAttr } from '../../../util';

afterEach(cleanup);

const mockBlur = jest.fn();
const mockChange = jest.fn();
const mockSubmit = jest.fn();

const defaultProps = {
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
  userData: [{ username: 'jiahlee', password: '' }],
  keepMeLoggedIn: jest.fn(),
};

const setUp = props => {
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
    const component = setUp({});
    expect(component).toMatchSnapshot();
  });

  it('test', () => {
    const component = setUp({});
    expect(defaultProps.keepMeLoggedIn).not.toHaveBeenCalled();
    fireEvent.click(component.getByTestId('checkbox-login'));
    expect(defaultProps.keepMeLoggedIn).toHaveBeenCalled();
  });

  it('test1', () => {
    // const component = setUp({});
    // const { container, getByTestId } = component;
    // console.log(container.getByTestId('formik'));
  });

  // it('renders textfield and button', () => {
  //   const textfield = wrapper.find('TextField');
  //   expect(textfield).toHaveLength(2);

  //   const button = wrapper.find('WithStyles(FormButton)');
  //   expect(button).toHaveLength(1);
  // });

  // describe('When errors and touched are true', () => {
  //   beforeEach(() => {
  //     wrapper.setProps({
  //       errors: { username: true, password: true },
  //       touched: { username: true, password: true },
  //     });
  //   });

  //   it('renders username helperText and error line', () => {
  //     const input = wrapper.find('#username');
  //     expect(input.props().helperText).not.toBe(0);
  //     expect(input.props().error).toEqual(true);
  //   });
  //   it('renders password helperText and error line', () => {
  //     const input = wrapper.find('#password');
  //     expect(input.props().helperText).not.toBe(0);
  //     expect(input.props().error).toEqual(true);
  //   });
  // });

  // describe('When one of errors and touched is false', () => {
  //   beforeEach(() => {
  //     wrapper.setProps({
  //       errors: { username: false, password: true },
  //       touched: { username: true, password: false },
  //     });
  //   });

  //   it('renders NO username helperText and error line', () => {
  //     const input = wrapper.find('#username');
  //     expect(input.props().helperText).toEqual(false);
  //     expect(input.props().error).toEqual(false);
  //   });
  //   it('renders NO password helperText and error line', () => {
  //     const input = wrapper.find('#password');
  //     expect(input.props().helperText).toEqual(false);
  //     expect(input.props().error).toEqual(false);
  //   });
  // });

  // describe('When the input value is inserted', () => {
  //   it('renders new username value', done => {
  //     const input = wrapper.find('#username');
  //     input.simulate('change', { target: { name: 'username', value: 'y' } });

  //     // enzyme's change event is synchronous and Formik's handlers are asynchronous
  //     setTimeout(() => {
  //       wrapper.update();
  //       expect(mockChange.calledOnce).toEqual(true);

  //       done();
  //     }, 1000);
  //   });
  //   it('renders password value', () => {});
  // });

  // it('call submit function on click', done => {
  //   const form = wrapper.find('form');
  //   form.simulate('submit', {
  //     preventDefault: () => {},
  //   });
  //   setTimeout(() => {
  //     wrapper.update();
  //     expect(mockSubmit.calledOnce).toEqual(true);
  //     done();
  //   }, 0);
  // });
});
