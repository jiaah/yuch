import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Modal from '../../shared/modal';
import BankForm from './bankForm';
import { bankAccountValidation } from '../../shared/formValidation';

const CreateBankModal = ({
  createBankAccount,
  handleCloseModal,
  addFlashMessage,
}) => {
  const values = { accountHolder: '', bankName: '', accountNo: '' };
  const handleCreateBankAccount = async (
    values,
    { setSubmitting, resetForm },
  ) => {
    try {
      await createBankAccount(values);
      await Promise.all([resetForm({}), handleCloseModal()]);
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          values.accountHolder
        } 님의 은행계좌 등록에 실패하였습니다. 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <div className="container">
      <Modal
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
