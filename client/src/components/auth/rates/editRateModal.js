import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Form from './editRateForm';
import { thisMonth, nextMonth, inTwoMonths } from '../../../shared/moment';
import { mealPriceValidation } from '../formValidation';

const EditRateModal = ({
  clickedUserData,
  hideModal,
  resetClickedItemData,
  updateReservedPrice,
  addFlashMessage,
}) => {
  const title = (
    <React.Fragment>
      <span className="b">{clickedUserData[0].companyName}</span> 식수가격
    </React.Fragment>
  );
  const [date, setDate] = React.useState(nextMonth);
  const handleSelectChange = e => setDate(e.target.value);

  const closeModal = async () => {
    if (clickedUserData.length !== 0) {
      await hideModal();
      return resetClickedItemData();
    }
    return hideModal();
  };
  const mealPrice = clickedUserData[0].mealPrice;
  const values = { mealPrice };

  const changeDateFormat = date => {
    // 'YYYY 년 MM 월' -> 'YYYY / MM' for UX
    const splitDate = date.split(' ').slice();
    const reservedDate = `${splitDate[0]} / ${splitDate[2]} `;
    return reservedDate;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { mealPrice } = values;
    const id = clickedUserData[0].id;

    try {
      const reservedDate = await changeDateFormat(date);
      await updateReservedPrice(id, reservedDate, mealPrice);
      await Promise.all([resetForm({}), closeModal()]);
      return window.location.reload(true);
    } catch (err) {
      await addFlashMessage(
        'error',
        `고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
      return setSubmitting(false);
    }
  };
  return (
    <div className="container">
      <Modal
        title={title}
        handleClose={closeModal}
        component={
          <Formik
            initialValues={values}
            render={props => (
              <Form
                {...props}
                date={date}
                thisMonth={thisMonth}
                nextMonth={nextMonth}
                inTwoMonths={inTwoMonths}
                handleSelectChange={handleSelectChange}
              />
            )}
            validationSchema={mealPriceValidation}
            onSubmit={handleSubmit}
          />
        }
      />
    </div>
  );
};

export default EditRateModal;
