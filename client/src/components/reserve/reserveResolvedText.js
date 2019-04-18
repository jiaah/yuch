import React from 'react';
/* --- Components --- */
import * as data from '../../shared/data';
import Button from '../../shared/button';

const ReserveResolvedText = ({ apiRequest, handleClose }) => (
  <React.Fragment>
    {apiRequest === 'success' ? (
      <p>{data.reserveSuccessMessage}</p>
    ) : apiRequest === 'error' ? (
      <p>
        {data.reserveErrorMessage} <br />
        <br />
        <a className="b" href="tel:+82-54-745-0999">
          상담전화&#8201;
          <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
        </a>
      </p>
    ) : null}
    <div className="mt2">
      <Button
        typeValue="reset"
        variantValue="contained"
        buttonName="닫기"
        width="medium"
        handleButtonClick={ev => handleClose(ev)}
      />
    </div>
  </React.Fragment>
);

export default ReserveResolvedText;
