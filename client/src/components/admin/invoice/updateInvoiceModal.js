import React, { useState, useEffect } from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Select from '../../../shared/form/select';
import Button from '../../../shared/form/button';

const UpdateInvoiceModal = ({
  // global states
  updateInvoiceMonth,
  // actions
  hideModal,
  addFlashMessage,
  updateUsersInvoice,
  // func
  formatSlashToYYMM,
  selectOptionsYYYYMM,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = async () => {
    await setSubmitting(true);
    const formattedDate = formatSlashToYYMM(updateInvoiceMonth);
    const res = await updateUsersInvoice(formattedDate);

    if (res.error) {
      await addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    } else {
      await addFlashMessage('success', '성공적으로 업데이트 되었습니다');
      hideModal();
      window.location.reload(true);
    }
    return setSubmitting(false);
  };

  useEffect(() => () => hideModal(), []);

  const selectOptions = selectOptionsYYYYMM([0, -1, -2]);

  return (
    <Modal
      title="인보이스 재발행"
      handleClose={hideModal}
      component={
        <div className="media--justify-center pt3 pb3">
          <Select
            label="변경일자(YYYY/MM)"
            name="updateInvoice"
            size="large"
            selectedValue={updateInvoiceMonth}
            options={selectOptions}
          />
          <div className="mt2">
            <Button
              typeValue="submit"
              variantValue="contained"
              buttonName="업데이트"
              width="medium"
              isSubmitting={isSubmitting}
              handleButtonClick={handleUpdate}
            />
          </div>
        </div>
      }
    />
  );
};

export default UpdateInvoiceModal;
