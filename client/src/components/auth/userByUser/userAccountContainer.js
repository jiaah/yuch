import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import UserFormBox from './userFormBox';
import {
  editUserAccountValidation,
  changePasswordValidation,
} from '../formValidation';
import PasswordFormBox from '../password/passwordContainer';
import Paper from '../../../shared/paper';
/* --- Actions --- */
import { editUserAccount, changePassword } from '../../../actions/authAction';
import { getMe } from '../../../actions/userAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  getMe,
  editUserAccount,
  changePassword,
  addFlashMessage,
  id,
}) => {
  const [userData, setUserData] = useState(null);
  const [pwdOpen, setPwdOpen] = useState(false);
  const fetchUserData = async () => {
    const data = await getMe(id);
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const openPasswordForm = () => setPwdOpen(true);
  const closePasswordForm = () => setPwdOpen(false);
  return (
    <div className="container pt2">
      <h2>Personal Info</h2>
      <p className="pb3 pt2 f-mini">
        유청 서비스를 이용하시는 고객님의 기본정보와 식수량 설정
      </p>
      <Paper
        classes="paper-small"
        component={
          <React.Fragment>
            <h3 className="flex justify-start">Profile</h3>
            {/* 'adminData' condition is needed as 'formik form values' render
            before receiving 'the retrieved admin data' */}
            {userData &&
              !pwdOpen && (
                <UserFormBox
                  userData={userData}
                  editUserAccountValidation={editUserAccountValidation}
                  editUserAccount={editUserAccount}
                  addFlashMessage={addFlashMessage}
                  openPasswordForm={openPasswordForm}
                />
              )}
            {pwdOpen && (
              <PasswordFormBox
                userData={userData}
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

const mapStateToPorps = state => ({ id: state.auth.id });
const mapDispatchToProps = dispatch => ({
  getMe: id => dispatch(getMe(id)),
  editUserAccount: (id, values) => dispatch(editUserAccount(id, values)),
  changePassword: (id, password, newPassword) =>
    dispatch(changePassword(id, password, newPassword)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps,
)(AdminAccountContainer);
