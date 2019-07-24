import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import UserFormBox from './userFormBox';
import { editUserAccountValidation } from '../../formValidation';
import ChangePwContainer from '../../auth/password/changePwContainer';
import Paper from '../../../shared/paper';
/* --- Actions --- */
import * as userActions from '../../../actions/userAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  userActions: { getMe, editUserAccount, updateCompanyName },
  addFlashMessage,
  id,
}) => {
  const [userData, setUserData] = useState(null);
  const [pwdOpen, setPwdOpen] = useState(false);
  const fetchUserData = async () => {
    const data = await getMe(id);
    setUserData(data[0]);
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
        classes="box-container"
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
                  updateCompanyName={updateCompanyName}
                  addFlashMessage={addFlashMessage}
                  openPasswordForm={openPasswordForm}
                />
              )}
            {pwdOpen && (
              <ChangePwContainer
                userData={userData}
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
  userActions: bindActionCreators(userActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps,
)(AdminAccountContainer);
