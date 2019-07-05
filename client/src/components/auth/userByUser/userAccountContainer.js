import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import UserFormBox from './userFormBox';
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
  const [pwdOpen, setPwdOpen] = useState(false);
  const fetchAdminData = async () => {
    const data = await getAdminAccount();
    setAdminData(data);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const openPasswordForm = () => setPwdOpen(true);
  const closePasswordForm = () => setPwdOpen(false);
  return (
    <div className="container pt4">
      <h2>Personal Info</h2>
      <p className="pb3 pt2 f-mini">
        홈페이지 메인화면의 연락처와 예약받는 이메일 주소는 변경되지 않습니다.
      </p>
      <Paper
        classes="paper-small"
        component={
          <React.Fragment>
            <h3 className="flex justify-start">Profile</h3>
            {/* 'adminData' condition is needed as 'formik form values' render
            before receiving 'the retrieved admin data' */}
            {adminData &&
              !pwdOpen && (
                <UserFormBox
                  adminData={adminData}
                  adminAccountValidation={adminAccountValidation}
                  editAdminAccount={editAdminAccount}
                  addFlashMessage={addFlashMessage}
                  openPasswordForm={openPasswordForm}
                />
              )}
            {pwdOpen && (
              <PasswordFormBox
                userData={adminData}
                changePasswordValidation={changePasswordValidation}
                changePassword={changePassword}
                addFlashMessage={addFlashMessage}
                closePasswordForm={closePasswordForm}
              />
            )}
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
