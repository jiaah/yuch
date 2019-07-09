import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Form from './editRateForm';
// import { mealPriceValidation } from '../formValidation';

const EditRateModal = ({
  clickedUserData,
  hideModal,
  resetClickedItemData,
}) => {
  const title = (
    <React.Fragment>
      <span className="b">{clickedUserData[0].companyName}</span> 식수가격
    </React.Fragment>
  );
  const closeModal = () => {
    if (clickedUserData.length !== 0) {
      return Promise.all([resetClickedItemData(), hideModal()]);
    }
    return hideModal();
  };
  const mealPrice = clickedUserData[0].mealPrice;
  const values = { mealPrice };

  return (
    <div className="container">
      <Modal
        title={title}
        handleClose={closeModal}
        component={
          <Formik
            initialValues={values}
            render={props => <Form {...props} />}
            // validationSchema={mealPriceValidation}
          />
        }
      />
    </div>
  );
};

export default EditRateModal;
