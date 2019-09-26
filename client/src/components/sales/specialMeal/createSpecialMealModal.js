import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';

const createModal = ({
  formattedTmr,
  // actions
  hideModal,
  createSpecialMeal,
}) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const sendingData = { userId: '', ...values };
    console.log('sendingData: ', sendingData);
    const res = await createSpecialMeal(sendingData);
    console.log('res: ', res);
  };

  const initialValues = {
    companyName: '',
    date: formattedTmr,
    time: '12:30',
    quantity: '',
    sideDish: '',
    mealPrice: '',
    address: '',
    contactNo: '',
    note: '',
  };
  return (
    <div className="container">
      <Modal
        title="특식 등록"
        handleClose={() => hideModal()}
        component={
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => (
              <Form>
                <SpecialMealForm {...props} />
              </Form>
            )}
            validationSchema={specialMealValidation}
          />
        }
      />
    </div>
  );
};

export default createModal;
