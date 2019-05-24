import React from 'react';
/* --- Components --- */
import * as data from '../../shared/data';
import ReserveErrorMessage from './reserveErrorMessage';

const ReserveMessage = ({ isReserved }) => (
  <div data-testid="reserve-message">
    {isReserved === 'success' ? (
      data.message.reserve.success
    ) : isReserved === 'error' ? (
      <ReserveErrorMessage />
    ) : null}
  </div>
);

export default ReserveMessage;
