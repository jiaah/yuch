import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({
  id,
  catering,
  updateUserCatering,
  addFlashMessage,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
}) => {
  const handleUpdateCatering = async (values, { setSubmitting }) => {
    const res = updateUserCatering(id, values);
    if (!res.error) {
      addFlashMessage('success', `저장되었습니다.`);
    } else {
      addFlashMessage('error', `저장되지 않았습니다. 다시 시도해 주세요.`);
    }
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={catering}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <CateringForm
            {...props}
            isLunchQtyDisabled={isLunchQtyDisabled}
            isDinnerQtyDisabled={isDinnerQtyDisabled}
          />
        </Form>
      )}
      onSubmit={handleUpdateCatering}
      // validationSchema={}
    />
  );
};

export default CateringFormBox;
