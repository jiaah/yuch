import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
import {
  adminAccountValidation,
  changePasswordValidation,
} from '../formValidation';
import PasswordFormBox from '../password/passwordContainer';
import Paper from '../../../shared/paper';
/* --- Actions --- */
import {
  getAdminAccount,
  editAdminAccount,
  changePassword,
} from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  getAdminAccount,
  editAdminAccount,
  changePassword,
  addFlashMessage,
}) => {
  const [adminData, setAdminData] = useState(null);
  const fetchAdminData = async () => {
    const data = await getAdminAccount();
    setAdminData(data);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="container">
      <Paper
        component={
          <React.Fragment>
            {/* 'adminData' condition is needed as 'formik form values' render
            before receiving 'the retrieved admin data' */}
            {adminData && (
              <FormBox
                adminData={adminData}
                adminAccountValidation={adminAccountValidation}
                editAdminAccount={editAdminAccount}
                addFlashMessage={addFlashMessage}
              />
            )}
            <PasswordFormBox
              userData={adminData}
              changePasswordValidation={changePasswordValidation}
              changePassword={changePassword}
              addFlashMessage={addFlashMessage}
            />
          </React.Fragment>
        }
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getAdminAccount: companyName => dispatch(getAdminAccount(companyName)),
  editAdminAccount: (id, values) => dispatch(editAdminAccount(id, values)),
  changePassword: (id, password, newPassword) =>
    dispatch(changePassword(id, password, newPassword)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminAccountContainer);
