import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
/* --- Components --- */
import AdminVerificationForm from './adminVerificationForm';
import { passwordValidation } from '../../components/formValidation';
/* --- Actions --- */
import { verifyAdminUser } from '../../actions/authAction';
import { addFlashMessage } from '../../actions/messageAction';

const AdminVerificationContainer = ({
  // actions
  verifyAdminUser,
  addFlashMessage,
  // props passed from a parent component
  handleAdminVerificationSuccess,
  confirmType,
}) => {
  const values = { password: '' };

  const handleVerification = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;

    const res = await verifyAdminUser(password);
    if (!res.error) {
      await Promise.all([resetForm({}), setSubmitting(false)]);
      return handleAdminVerificationSuccess();
    }
    addFlashMessage('error', `비밀번호를 확인해주세요.`);
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={values}
      render={props => (
        <Form>
          <AdminVerificationForm {...props} confirmType={confirmType} />
        </Form>
      )}
      onSubmit={handleVerification}
      validationSchema={passwordValidation}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  verifyAdminUser: password => dispatch(verifyAdminUser(password)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminVerificationContainer);
