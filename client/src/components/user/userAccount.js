import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './userForm';
import { userValidation } from '../auth/formValidation';

class UserAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      values: {},
      // NOT WORKING !
    };
  }

  componentDidMount() {
    // retrieve user data (without password and account number)
    const values = {
      username: 'jiahlee',
      password: '',
      confirmPassword: '',
      companyName: 'jiahlee',
      contactNumber: '010-2652-6985',
      email: 'jiahlee88@hanmail.net',
      mealPrice: '5000',
      lunchQuantityValue: '30',
      dinnerQuantityValue: '',
    };
    this.setState({
      values,
    });
  }

  saveUserAccount = () => {};

  render() {
    return (
      <div>
        <h2>고객계정</h2>
        <Formik
          initialValues={this.state.values}
          render={props => <Form {...props} state={this.state} />}
          onSubmit={this.saveUserAccount}
          validationSchema={userValidation}
        />
        ;
      </div>
    );
  }
}

export default UserAccount;
