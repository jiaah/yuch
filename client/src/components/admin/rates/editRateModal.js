import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import RateForm from './editRateForm';
import { thisMonth, nextMonth, inTwoMonths } from '../../../helpers/moment';
import { reservePriceValidation } from '../../formValidation';
import { saveYposition } from '../../../helpers/scrollPosition';

const EditRateModal = ({
  // global states
  clickedUserData,
  // actions
  hideModal,
  updateReservedPrice,
  addFlashMessage,
}) => {
  const title = (
    <React.Fragment>
      <span className="b">{clickedUserData.companyName}</span> 식수가격
    </React.Fragment>
  );
  const date = (clickedUserData && clickedUserData.reserveDate) || nextMonth;
  const [reserveDate, setReserveDate] = React.useState(date);
  const reservePrice = clickedUserData.reservePrice;
  const values = { reservePrice };

  const handleSelectChange = e => setReserveDate(e.target.value);
  const closeModal = () => hideModal();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { reservePrice } = values;
    const userId = clickedUserData.userId;
    const res = await updateReservedPrice(userId, reservePrice, reserveDate);
    if (res.error) {
      addFlashMessage(
        'error',
        `고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
      return setSubmitting(false);
    }
    await saveYposition();
    await Promise.all([resetForm({}), closeModal()]);
    return window.location.reload(true);
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
              <Form>
                <RateForm
                  {...props}
                  reserveDate={reserveDate}
                  thisMonth={thisMonth}
                  nextMonth={nextMonth}
                  inTwoMonths={inTwoMonths}
                  handleSelectChange={handleSelectChange}
                />
              </Form>
            )}
            validationSchema={reservePriceValidation}
            onSubmit={handleSubmit}
          />
        }
      />
    </div>
  );
};

export default EditRateModal;
