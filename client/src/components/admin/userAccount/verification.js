import React from 'react';
/* --- Components --- */
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';

const Verification = ({ handleSubmit }) => (
  <AdminVerificationContainer
    handleAdminVerificationSuccess={handleSubmit}
    confirmType="edit"
  />
);

export default DeleteUserFormBox;
