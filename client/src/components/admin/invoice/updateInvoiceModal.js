import React, { useState, useEffect } from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Select from '../../../shared/form/select';
import FormButton from '../../../shared/form/formButton';
import { updateInvoiceSelectOptions } from '../../../data/data';

const UpdateInvoiceModal = ({
  // global states
  updateInvoiceMonth,
  // actions
  hideModal,
  addFlashMessage,
  updateUsersInvoice,
  // func
  MMFormatToYYMM,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = async () => {
    await setSubmitting(true);
    const formattedDate = MMFormatToYYMM(updateInvoiceMonth);
    const res = await updateUsersInvoice(formattedDate);

    if (res.error) {
      addFlashMessage('error', 'error');
    } else {
      hideModal();
    }
    return setSubmitting(false);
  };

  useEffect(() => () => hideModal(), []);

  return (
    <Modal
      title="인보이스/매출 업데이트"
      handleClose={hideModal}
      component={
        <form onSubmit={handleUpdate} className="media--justify-center pt5 pb4">
          <div className="">
            <Select
              label="업데이트 월"
              name="updateInvoice"
              size="large"
              selectedValue={updateInvoiceMonth}
              options={updateInvoiceSelectOptions}
            />
          </div>

          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="저장"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </form>
      }
    />
  );
};

export default UpdateInvoiceModal;
