import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
import { adminAccountValidation } from '../formValidation';
/* --- Actions --- */
import { getAdminAccount, editAdminAccount } from '../../../actions/authAction';

const AdminAccountContainer = ({ getAdminAccount, editAdminAccount }) => {
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
          editAdminAccount={editAdminAccount}
          adminAccountValidation={adminAccountValidation}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getAdminAccount: companyName => dispatch(getAdminAccount(companyName)),
  editAdminAccount: (id, values) => dispatch(editAdminAccount(id, values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminAccountContainer);
