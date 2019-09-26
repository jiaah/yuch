import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import {} from '../../formValidation';

const createModal = ({
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
    date: '',
    time: '',
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
                <SpecialMealForm />
              </Form>
            )}
            // validationSchema={}
          />
        }
      />
    </div>
  );
};

export default createModal;
