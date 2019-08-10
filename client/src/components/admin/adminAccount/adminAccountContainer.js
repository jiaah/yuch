import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
import { adminAccountValidation } from '../../formValidation';
import ChangePwContainer from '../../auth/password/changePwContainer';
import Paper from '../../../shared/paper';
/* --- Actions --- */
import { getAdmin, editAdminAccount } from '../../../actions/adminAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  getAdmin,
  editAdminAccount,
  addFlashMessage,
  id,
}) => {
  const [adminData, setAdminData] = useState(null);
  const [pwdOpen, setPwdOpen] = useState(false);
  const fetchAdminData = async () => {
    const data = await getAdmin(id);
    if (data.error) {
      // to render the form
      // setting default adminData to {} would not render server data
      setAdminData({});
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setAdminData(data);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const openPasswordForm = () => setPwdOpen(true);
  const closePasswordForm = () => setPwdOpen(false);
  return (
    <div className="container">
      <h2>Personal Info</h2>
      <p className="pb3 pt2 f-mini">
        홈페이지 메인화면의 연락처와 예약받는 이메일 주소는 변경되지 않습니다.
      </p>
      <Paper
        classes="box-container"
        component={
          <React.Fragment>
            <h3 className="flex justify-start">Profile</h3>
            {/* 'adminData' condition is needed as 'formik form values' render
            before receiving 'the retrieved admin data' */}
            {adminData &&
              !pwdOpen && (
                <FormBox
                  adminData={adminData}
                  adminAccountValidation={adminAccountValidation}
                  editAdminAccount={editAdminAccount}
                  addFlashMessage={addFlashMessage}
                  openPasswordForm={openPasswordForm}
                />
              )}
            {pwdOpen && (
              <ChangePwContainer
                userData={adminData}
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
  getAdmin: id => dispatch(getAdmin(id)),
  editAdminAccount: (id, values) => dispatch(editAdminAccount(id, values)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps,
)(AdminAccountContainer);
