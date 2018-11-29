import React from 'react';
/* --- Components --- */
import ReserveForm from './reserveForm';
import ReserveResolvedText from './reserveResolvedText';

const SwitchReserve = ({
  apiRequest,
  reserveInfo,
  inThreeDays,
  submitBtnClicked,
  handleClose,
  handleChange,
  handleSubmit,
}) => (
  <React.Fragment>
    <h3 variant="title" id="modal-title" className="f-xl">
      - Reservation -
    </h3>
    {!apiRequest ? (
      <ReserveForm
        reserveInfo={reserveInfo}
        inThreeDays={inThreeDays}
        submitBtnClicked={submitBtnClicked}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    ) : (
      <ReserveResolvedText handleClose={handleClose} apiRequest={apiRequest} />
    )}
  </React.Fragment>
);

export default SwitchReserve;
