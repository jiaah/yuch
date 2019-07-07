import React from 'react';
/* --- Components --- */
import Loader from '../../../shared/loader';
import Modal from '../../../shared/modal';

const EditRateModal = ({
  clickedUserData,
  hideModal,
  resetClickedItemData,
}) => {
  const closeModal = () => {
    if (clickedUserData.length !== 0) {
      return Promise.all([resetClickedItemData(), hideModal()]);
    }
    return hideModal();
  };
  return (
    <div className="container">
      <Modal
        title="식수가격 수정"
        handleClose={closeModal}
        component={<h1>hello</h1>}
      />
    </div>
  );
};

export default EditRateModal;
