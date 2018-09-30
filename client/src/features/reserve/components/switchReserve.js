import React from 'react';
/* --- Components --- */
import ReserveForm from './reserveForm';
import ReserveResolvedText from './reserveResolvedText';

const SwitchReserve = ({
  tommrow,
  apiRequest,
  reserveInfo,
  handleClose,
  handleChange,
  handleSave,
}) => (
  <div>
    {apiRequest === '' || apiRequest === undefined ? (
      <ReserveForm
        tommrow={tommrow}
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
