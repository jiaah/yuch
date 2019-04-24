import React from 'react';

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
