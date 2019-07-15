import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
/* --- Components --- */
import { admin } from '../../data/data';
import ForgotForm from './forgotForm';
import { forgotValidation } from './formValidation';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';

const ForgotContainer = ({
  authActions: { sendVerificationCodeToEmail },
  location,
}) => {
  const parsed = queryString.parse(location.search);

  const handleConfirmEmail = (values, { setSubmitting, resetForm }) => {
    const valueToFind = parsed.value;
    const { email } = values;
    sendVerificationCodeToEmail(email, valueToFind);
  };
  const values = {
    email: '',
  };

  return (
    <div className="forgot-container">
      <p className="mb2 b f-regular lh-1">
        {admin.companyName}에 등록되어 있는 이메일 주소를 입력해 주세요.
      </p>
      <p className="c-text-grey lh-1 f-mini">
        고객님이 입력한 이메일로 인증코드가 전송됩니다. <br />
        등록한 이메일 주소가 없거나, 기억이 나지 않으시면 {admin.companyName}
        으로 문의 바랍니다.
      </p>
      <Formik
        initialValues={values}
        render={props => <ForgotForm {...props} />}
        onSubmit={handleConfirmEmail}
        validationSchema={forgotValidation}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});
export default connect(
  null,
  mapDispatchToProps,
)(ForgotContainer);
