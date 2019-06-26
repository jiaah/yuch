/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Modal from '../../shared/modal';
import BankForm from './bankForm';
import { bankAccountValidation } from './formValidation';

const CreateBankModal = ({ show, handleCloseModal, messageShow }) => {
  const values = { accountHolder: '', bankName: '', accountNo: '' };

  const handleCreateBankAccount = () =>
    console.log('creating bank account is submitted');

  return (
    <div className="container">
      <Modal
        show={show}
        messageShow={messageShow}
        title="은행계좌 등록"
        handleClose={handleCloseModal}
        component={
          <Formik
            initialValues={values}
            render={props => <BankForm {...props} />}
            onSubmit={handleCreateBankAccount}
            validationSchema={bankAccountValidation}
          />
        }
      />
    </div>
  );
};

export default CreateBankModal;
