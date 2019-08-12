import React, { useEffect } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import AdminVerificationContainer from './adminVerificationContainer';
import Modal from '../modal';
/* --- Actions --- */
import { hideModal } from '../../actions/modalAction';
import { addFlashMessage } from '../../actions/messageAction';
import { handleAdminVerificationStatus } from '../../actions/authAction';

const AdminConfirmModal = ({
  show,
  isAdminVerified,
  hideModal,
  handleAdminVerificationStatus,
  addFlashMessage,
}) => {
  // 'isAdminVerified' is required to distinguish 'admin password check' modal and 'rate edit modal'.
  const handleAdminVerificationSuccess = async () => {
    if (!isAdminVerified) await handleAdminVerificationStatus();
    return hideModal();
  };
  const closeModal = async () => {
    addFlashMessage(
      'warning',
      '중요한 데이터 보안을 위해 비밀번호 확인이 필요합니다.',
    );
    return hideModal();
  };

  useEffect(
    () => () => {
      Promise.all([show ? hideModal() : null]);
    },
    [],
  );
  if (show && !isAdminVerified) {
    return (
      <Modal
        title=""
        handleClose={closeModal}
        component={
          <AdminVerificationContainer
            handleAdminVerificationSuccess={handleAdminVerificationSuccess}
            confirmType="create"
          />
        }
      />
    );
  }
  return null;
};

const mapStateToProps = state => ({
  show: state.modal.show,
  isAdminVerified: state.isAdminVerified.isAdminVerified,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  handleAdminVerificationStatus: () =>
    dispatch(handleAdminVerificationStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminConfirmModal);
