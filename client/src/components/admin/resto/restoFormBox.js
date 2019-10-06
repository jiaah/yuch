import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import RestoForm from './restoForm';
import { restoSalesValidation } from '../../formValidation';

const RestoFormBox = ({ resto, date, updateRestoSales, addFlashMessage }) => {
  const { lunch, dinner } = resto;

  const handleUpdateRestoSales = async (values, { setSubmitting }) => {
    const res = await updateRestoSales({ date, ...values });
    if (!res.error) {
      addFlashMessage('success', `저장되었습니다.`);
    }
    if (res.error) {
      addFlashMessage('error', `저장되지 않았습니다. 다시 시도해 주세요.`);
    }
    return setSubmitting(false);
  };

  const inputValues = {
    lunch,
    dinner,
  };

  return (
    <Formik
      initialValues={inputValues}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <RestoForm {...props} />
        </Form>
      )}
      onSubmit={handleUpdateRestoSales}
      validationSchema={restoSalesValidation}
    />
  );
};

export default RestoFormBox;
