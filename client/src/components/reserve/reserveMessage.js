import React from 'react';
/* --- Components --- */
import * as data from '../../shared/data';
import ReserveErrorMessage from './reserveErrorMessage';

const ReserveMessage = ({ isReserved }) => (
  <React.Fragment>
    {isReserved === 'success' ? (
      data.message.reserve.success
    ) : isReserved === 'error' ? (
      <ReserveErrorMessage />
    ) : null}
  </React.Fragment>
);

export default ReserveMessage;
