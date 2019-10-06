import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './form';
import { formattedToday } from '../../../helpers/moment';

const CreateFormBox = ({
  partnerValidation,
  // actions
  createPartner,
  addFlashMessage,
  saveClickedItemData,
  // func
  handleCloseModal,
}) => {
  const values = {
    companyName: '',
    accountHolder: '',
    bankName: '',
    accountNo: '',
    contactNo: '',
  };
  const handleCreatePartner = async (values, { setSubmitting, resetForm }) => {
    // to focus the created row
    await saveClickedItemData(values);

    const res = await createPartner(values);
    if (!res.error) {
      addFlashMessage(
        'success',
        `${values.companyName} 거래처를 등록하였습니다.`,
      );
      await Promise.all([resetForm({}), handleCloseModal()]);
      window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        `${
          values.companyName
        } 님의 정보 수정에 실패하였습니다. 이미 등록한 거래처인지 확인하신 후, 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={values}
      render={props => (
        <Form className="mh1">
          <EmployeeForm {...props} />
        </Form>
      )}
      onSubmit={handleCreatePartner}
      validationSchema={partnerValidation}
    />
  );
};

export default CreateFormBox;
