import React from 'react';
/* --- Components --- */
import { message } from '../../data/data';
import ReserveErrorMessage from './reserveErrorMessage';

const ReserveMessage = ({ isReserved }) => (
  <div data-testid="reserve-message">
    {isReserved === 'success' ? (
      message.reserve.success
    ) : isReserved === 'error' ? (
      <ReserveErrorMessage />
    ) : null}
  </div>
);

export default ReserveMessage;
