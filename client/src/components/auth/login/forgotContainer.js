import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
/* --- Components --- */
import { admin } from '../../../data/data';
import UsernameFormBox from './forgotUsernamePage';
import PasswordFormBox from './forgotPasswordPage';
import {
  forgotUsernameValidation,
  forgotPasswordValidation,
} from '../../formValidation';
import FoundUsername from './foundUsernamePage';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as messageActions from '../../../actions/messageAction';

const ForgotContainer = ({
  authActions: {
    findUsernameWithEmail,
    findUsernameWithContact,
    sendVerificationCodeToEmail,
  },
  messageActions: { addFlashMessage },
  location,
}) => {
  // 인증방법 radio buttons
  const [selectedValue, setSelectedValue] = useState('contactNo');
  const handleSelectRadioButton = e => setSelectedValue(e.target.value);

  const parsed = queryString.parse(location.search);
  const valueToFind = parsed.value;
  const { companyName } = admin;

  const [state, setState] = useState({ foundUser: false, data: '' });
  const { foundUser, data } = state;

  // to display users info on api request success
  const saveUsername = (companyName, username, values) => {
    const { email, contactNo } = values;
    setState({
      foundUser: true,
      data: { companyName, username, email, contactNo },
    });
  };

  return (
    <div className="verify-user--container">
      {valueToFind === 'username' ? (
        !foundUser ? (
          <UsernameFormBox
            companyName={companyName}
            forgotUsernameValidation={forgotUsernameValidation}
            findUsernameWithEmail={findUsernameWithEmail}
            findUsernameWithContact={findUsernameWithContact}
            addFlashMessage={addFlashMessage}
            saveUsername={saveUsername}
            selectedValue={selectedValue}
            handleSelectRadioButton={handleSelectRadioButton}
          />
        ) : (
          <FoundUsername data={data} selectedValue={selectedValue} />
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
