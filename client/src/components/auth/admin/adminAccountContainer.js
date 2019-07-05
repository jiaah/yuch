import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
import { adminAccountValidation } from '../formValidation';
/* --- Actions --- */
import { getAdminAccount, editAdminAccount } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  getAdminAccount,
  editAdminAccount,
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
    <React.Fragment>
      {/* 'adminData' condition is needed as 'formik form values' render before receiving 'the retrieved admin data' */}
      {adminData && (
        <FormBox
          adminData={adminData}
          adminAccountValidation={adminAccountValidation}
          editAdminAccount={editAdminAccount}
          addFlashMessage={addFlashMessage}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getAdminAccount: companyName => dispatch(getAdminAccount(companyName)),
  editAdminAccount: (id, values) => dispatch(editAdminAccount(id, values)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminAccountContainer);
