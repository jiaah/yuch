import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
/* --- Components --- */
import { admin } from '../../data/data';
import UsernameFormBox from './usernameFormBox';
import PasswordFormBox from './passwordFormBox';
import {
  forgotUsernameValidation,
  forgotPasswordValidation,
} from './formValidation';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as messageActions from '../../actions/messageAction';

const ForgotContainer = ({
  authActions: { findUsername, sendVerificationCodeToEmail },
  messageActions: { addFlashMessage },
  location,
}) => {
  const parsed = queryString.parse(location.search);
  const valueToFind = parsed.value;
  const { companyName } = admin;

  return (
    <div className="forgot-container">
      {valueToFind === 'username' && (
        <UsernameFormBox
          companyName={companyName}
          forgotUsernameValidation={forgotUsernameValidation}
          findUsername={findUsername}
          addFlashMessage={addFlashMessage}
        />
      )}
      {valueToFind === 'password' && (
        <PasswordFormBox
          companyName={companyName}
          forgotPasswordValidation={forgotPasswordValidation}
          sendVerificationCodeToEmail={sendVerificationCodeToEmail}
          addFlashMessage={addFlashMessage}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  messageActions: bindActionCreators(messageActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(ForgotContainer);
