import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import BankForm from './bankForm';
import { createBankAccountMsg } from '../../../data/message';

const CreateBankFormBox = ({
  bankAccountValidation,
  createBankAccount,
  handleCloseModal,
  addFlashMessage,
  bankAccount,
}) => {
  const values = { accountHolder: '', bankName: '', accountNo: '' };
  const handleCreateBankAccount = async (
    values,
    { setSubmitting, resetForm },
  ) => {
    const res = await createBankAccount(values);
    if (!res.error) {
      await Promise.all([resetForm({}), handleCloseModal()]);
      return window.location.reload(true);
    }
    addFlashMessage(
      'error',
      `${
        values.accountHolder
      } 님의 은행계좌 등록에 실패하였습니다. 이미 등록한 계좌정보인지 확인하신후, 다시 시도해주세요.`,
    );
    return setSubmitting(false);
  };
  return (
    <React.Fragment>
      {bankAccount.length >= 4 ? (
        <React.Fragment>{createBankAccountMsg}</React.Fragment>
      ) : (
        <Formik
          initialValues={values}
          render={props => (
            <Form className="mh1">
              <BankForm {...props} />
            </Form>
          )}
          onSubmit={handleCreateBankAccount}
          validationSchema={bankAccountValidation}
        />
      )}
    </React.Fragment>
  );
};

export default CreateBankFormBox;
