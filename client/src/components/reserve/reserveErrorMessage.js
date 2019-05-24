import React from 'react';
import * as data from '../../shared/data';

const ReserveErrorMessage = () => (
  <React.Fragment>
    <p data-testid="reserve-message--error">{data.message.reserve.error}</p>
    <br />
    <a
      className="td-none c-point2"
      href="tel:+82-54-745-0999"
      aria-label="dial a phone call"
    >
      054 &#46; &#8201;745&#8200; &#46; 0999
    </a>
  </React.Fragment>
);

export default ReserveErrorMessage;
