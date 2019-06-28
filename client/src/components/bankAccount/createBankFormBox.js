import React, { useState } from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import BankForm from './bankForm';
import AdminConfirmContainer from '../../shared/adminConfirm/adminConfirmContainer';

const CreateBankFormBox = ({
  bankAccountValidation,
  createBankAccount,
  handleCloseModal,
  addFlashMessage,
}) => {
  const values = { accountHolder: '', bankName: '', accountNo: '' };
  const [confirmMsg, setConfirmMesg] = useState(true);
  const checkIfUserIsAdmin = () => setConfirmMesg(false);
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
        } 님의 은행계좌 등록에 실패하였습니다. 이미 등록한 계좌정보인지 확인하신후, 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <React.Fragment>
      {confirmMsg ? (
        <AdminConfirmContainer
          handleButtonClick={checkIfUserIsAdmin}
          confirmType="edit"
        />
      ) : (
        <Formik
          initialValues={values}
          render={props => <BankForm {...props} />}
          onSubmit={handleCreateBankAccount}
          validationSchema={bankAccountValidation}
        />
      )}
    </React.Fragment>
  );
};

export default CreateBankFormBox;
