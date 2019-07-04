import React, { useEffect } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FormBox from './adminFormBox';
/* --- Actions --- */
import { getAdminAccount } from '../../../actions/authAction';

const AdminAccountContainer = ({ getAdminAccount }) => {
  const fetchAdminData = async () => {
    const data = await getAdminAccount();
    console.log('data: ', data);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);
  return <FormBox />;
};

const mapDispatchToProps = dispatch => ({
  getAdminAccount: companyName => dispatch(getAdminAccount(companyName)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AdminAccountContainer);
