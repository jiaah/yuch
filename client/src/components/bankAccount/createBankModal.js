/* eslint-disable no-alert */
import React from 'react';
/* --- Components --- */
import Modal from '../../shared/modal';

const CreateBankModal = ({ show, handleCloseModal, messageShow }) => (
  <div className="container">
    <Modal
      show={show}
      messageShow={messageShow}
      title="은행계좌 등록"
      handleClose={handleCloseModal}
      component={<h2>hello</h2>}
    />
  </div>
);

export default CreateBankModal;
