import React, { useState } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import BankForm from './bankForm';
import AdminConfirmContainer from '../../../shared/adminConfirm/adminConfirmContainer';

const CreateBankFormBox = ({
  bankAccountValidation,
  createBankAccount,
  handleCloseModal,
  addFlashMessage,
  bankAccount,
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
      {bankAccount.length >= 4 ? (
        <div className="mb3">
          <p className="mb3">
            계좌를&#8201;
            <span className="c-point2">5개 이상</span> 등록할 수 없습니다.
          </p>
          <p>
            등록한 계좌 중 사용하지 않는 계좌를 삭제하거나
            <span className="c-point2">&#8201;수정을 해주세요</span>.
          </p>
        </div>
      ) : confirmMsg ? (
        <AdminConfirmContainer
          handleButtonClick={checkIfUserIsAdmin}
          confirmType="edit"
        />
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
