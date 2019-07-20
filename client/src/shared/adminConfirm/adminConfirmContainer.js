import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
/* --- Components --- */
import AdminConfirmForm from './adminConfirmForm';
import { passwordValidation } from '../../components/formValidation';
/* --- Actions --- */
import { confirmAdminUser } from '../../actions/authAction';
import { addFlashMessage } from '../../actions/messageAction';

const AdminConfirmContainer = ({
  // actions
  confirmAdminUser,
  addFlashMessage,
  // props passed from a parent component
  handleButtonClick,
  confirmType,
}) => {
  const values = { password: '' };

  const handleConfirm = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;
    try {
      await confirmAdminUser(password);
      await Promise.all([resetForm({}), setSubmitting(false)]);
      return handleButtonClick();
    } catch (err) {
      setSubmitting(false);
      return addFlashMessage('error', `비밀번호를 확인해주세요.`);
    }
  };

  return (
    <Formik
      initialValues={values}
      render={props => (
        <AdminConfirmForm {...props} confirmType={confirmType} />
      )}
      onSubmit={handleConfirm}
      validationSchema={passwordValidation}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  confirmAdminUser: password => dispatch(confirmAdminUser(password)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminConfirmContainer);
