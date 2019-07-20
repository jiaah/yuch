import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
/* --- Components --- */
import { admin } from '../../../data/data';
import UsernameFormBox from './usernameFormBox';
import PasswordFormBox from './passwordFormBox';
import {
  forgotUsernameValidation,
  forgotPasswordValidation,
} from '../../formValidation';
import FoundUsername from './foundUsername';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as messageActions from '../../../actions/messageAction';

const ForgotContainer = ({
  authActions: { findUsername, sendVerificationCodeToEmail },
  messageActions: { addFlashMessage },
  location,
}) => {
  const parsed = queryString.parse(location.search);
  const valueToFind = parsed.value;
  const { companyName } = admin;

  const [state, setState] = useState({ foundUser: false, data: '' });
  const { foundUser, data } = state;

  const saveUsername = (username, email) => {
    setState({ foundUser: true, data: { username, email } });
  };

  return (
    <div className="forgot-container">
      {valueToFind === 'username' ? (
        !foundUser ? (
          <UsernameFormBox
            companyName={companyName}
            forgotUsernameValidation={forgotUsernameValidation}
            findUsername={findUsername}
            addFlashMessage={addFlashMessage}
            saveUsername={saveUsername}
          />
        ) : (
          <FoundUsername data={data} />
        )
      ) : null}
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
