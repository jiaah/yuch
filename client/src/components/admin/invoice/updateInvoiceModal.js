import React, { useState, useEffect } from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Select from '../../../shared/form/select';
import FormButton from '../../../shared/form/formButton';

const UpdateInvoiceModal = ({
  // global states
  updateInvoiceMonth,
  // actions
  hideModal,
  addFlashMessage,
  updateUsersInvoice,
  // func
  formatSlashToYYMM,
  invoiceSelectOptions,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = async () => {
    await setSubmitting(true);
    const formattedDate = formatSlashToYYMM(updateInvoiceMonth);
    const res = await updateUsersInvoice(formattedDate);

    if (res.error) {
      addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    } else {
      addFlashMessage('success', '성공적으로 업데이트 되었습니다');
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
        <form onSubmit={handleUpdate} className="media--justify-center pt4 pb3">
          <Select
            label="변경일자(YYYY/MM)"
            name="updateInvoice"
            size="large"
            selectedValue={updateInvoiceMonth}
            options={invoiceSelectOptions}
          />
          <div className="mt2">
            <FormButton
              typeValue="submit"
              variantValue="contained"
              buttonName="업데이트"
              width="medium"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      }
    />
  );
};

export default UpdateInvoiceModal;
