import React from 'react';
/* --- Components --- */
import ReserveForm from './reserveForm';
import ReserveResolvedText from './reserveResolvedText';

const SwitchReserve = ({
  apiRequest,
  reserveInfo,
  handleClose,
  handleChange,
  handleSave,
}) => (
  <div>
    <h3 variant="title" id="modal-title" className="mb2">
      Reservation
    </h3>
    {apiRequest === '' || apiRequest === undefined ? (
      <ReserveForm
        reserveInfo={reserveInfo}
        handleChange={handleChange}
        handleSave={handleSave}
        handleClose={handleClose}
      />
    ) : (
      <ReserveResolvedText handleClose={handleClose} apiRequest={apiRequest} />
    )}
  </div>
);

export default SwitchReserve;
