import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Modal from '../../shared/modal';
import BankForm from './bankForm';
import { bankAccountValidation } from '../../shared/formValidation';

const CreateBankModal = ({ handleCloseModal }) => {
  const values = { accountHolder: '', bankName: '', accountNo: '' };
  return (
    <div className="container">
      <Modal
        title="은행계좌 등록"
        handleClose={handleCloseModal}
        component={
          <Formik
            initialValues={values}
            render={props => <BankForm {...props} />}
            // onSubmit={handleCreateBankAccount}
            validationSchema={bankAccountValidation}
          />
        }
      />
    </div>
  );
};

export default CreateBankModal;
