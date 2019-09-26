import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import {} from '../../formValidation';

const createModal = ({
  // actions
  hideModal,
}) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {};

  const initialValues = {
    companyName: '',
    date: '',
    time: '',
    quantity: '',
    mealPrice: '',
    address: '',
    contactNo: '',
    memo: '',
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
