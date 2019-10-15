import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './form';
import { formattedToday } from '../../../helpers/moment';

const CreateFormBox = ({
  employeeValidation,
  // global state
  clickedUserData,
  // actions
  createEmployee,
  addFlashMessage,
  saveClickedItemData,
  resetClickedItemData,
  // func
  handleCloseModal,
}) => {
  const values = {
    companyName: '',
    accountHolder: '',
    bankName: '',
    accountNo: '',
    contactNo: '',
    address: '',
    startDate: formattedToday,
  };

  useEffect(() => {
    if (clickedUserData.length !== 0) resetClickedItemData();
  }, []);

  const handleCreateBankAccount = async (
    values,
    { setSubmitting, resetForm },
  ) => {
    // to focus the created row
    await saveClickedItemData(values);

    const res = await createEmployee(values);
    if (!res.error) {
      addFlashMessage('success', `${values.companyName} 님을 등록하였습니다.`);
      await Promise.all([resetForm({}), handleCloseModal()]);
      window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        `${
          values.companyName
        } 님의 정보 수정에 실패하였습니다. 이미 등록한 직원인지 확인하신 후, 다시 시도해주세요.`,
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
      onSubmit={handleCreateBankAccount}
      validationSchema={employeeValidation}
    />
  );
};

export default CreateFormBox;
