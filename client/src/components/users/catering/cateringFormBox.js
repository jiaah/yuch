import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({
  date,
  catering,
  updateUserCatering,
  addFlashMessage,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
}) => {
  const handleUpdateCatering = async (values, { setSubmitting }) => {
    const updateDate = catering.date;
    const data = { ...values, updateDate };

    const res = updateUserCatering(catering.userId, data);
    if (!res.error) {
      addFlashMessage('success', `저장되었습니다.`);
    }
    if (res.error) {
      addFlashMessage('error', `저장되지 않았습니다. 다시 시도해 주세요.`);
    }
    return setSubmitting(false);
  };

  const inputValues = {
    lunchQty: catering.lunchQty,
    dinnerQty: catering.dinnerQty,
    lateNightSnackQty: catering.lateNightSnackQty,
  };

  return (
    <Formik
      initialValues={inputValues}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <CateringForm
            {...props}
            date={date}
            endDate={catering.endDate}
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
