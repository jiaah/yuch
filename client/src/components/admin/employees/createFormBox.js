import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './form';
import { formattedToday } from '../../../helpers/moment';

const CreateFormBox = ({
  employeeValidation,
  // global state
  position,
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
    name: '',
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
    const data = { ...values, position };

    // to focus the created row
    await saveClickedItemData(data);

    const res = await createEmployee(data);
    if (!res.error) {
      addFlashMessage('success', `성공적으로 등록하였습니다.`);
      await Promise.all([resetForm({}), handleCloseModal()]);
      // window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        `등록에 실패하였습니다. 이미 등록한 직원인지 확인하신 후, 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={values}
      render={props => (
        <Form className="mh1">
          <EmployeeForm {...props} position={position} />
        </Form>
      )}
      onSubmit={handleCreateBankAccount}
      validationSchema={employeeValidation}
    />
  );
};

export default CreateFormBox;
