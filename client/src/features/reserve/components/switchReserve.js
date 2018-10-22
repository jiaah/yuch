import React from 'react';
/* --- Components --- */
import ReserveForm from './reserveForm';
import ReserveResolvedText from './reserveResolvedText';

const SwitchReserve = ({
  apiRequest,
  reserveInfo,
  tomorrow,
  submitBtnClicked,
  handleClose,
  handleChange,
  handleSubmit,
}) => (
  <React.Fragment>
    <h3 variant="title" id="modal-title" className="mb2">
      Reservation
    </h3>
    {apiRequest === '' || apiRequest === undefined ? (
      <ReserveForm
        reserveInfo={reserveInfo}
        tomorrow={tomorrow}
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
