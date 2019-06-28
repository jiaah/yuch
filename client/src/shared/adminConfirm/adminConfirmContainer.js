import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
/* --- Components --- */
import AdminConfirmForm from './adminConfirmForm';
import * as data from '../data';
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
      await handleButtonClick();
      resetForm({});
    } catch (err) {
      await addFlashMessage('error', `비밀번호를 확인해주세요.`);
    }
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={values}
      render={props => (
        <AdminConfirmForm {...props} confirmType={confirmType} />
      )}
      onSubmit={handleConfirm}
      validationSchema={data.passwordValidation}
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
