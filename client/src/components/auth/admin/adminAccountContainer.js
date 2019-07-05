import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
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

  return <FormBox adminData={adminData} editAdminAccount={editAdminAccount} />;
};

const mapDispatchToProps = dispatch => ({
  getAdminAccount: companyName => dispatch(getAdminAccount(companyName)),
  editAdminAccount: (id, values) => dispatch(editAdminAccount(id, values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminAccountContainer);
