import React from 'react';
/* --- Components --- */
import Buttons from '../../../shared/buttons';
import * as data from '../../../shared/data';

const ReserveResolvedText = ({ apiRequest, handleClose }) => (
  <div>
    {apiRequest === 'success' ? (
      <p>{data.reserveSuccessMessage}</p>
    ) : apiRequest === 'error' ? (
      <p>
        {data.reserveErrorMessage} <br />
        <br />
        <span className="b">상담전화 054-745-0999</span>
      </p>
    ) : null}
    <div className="mt2">
      <Buttons
        handleClick={handleClose}
        variantValue="outlined"
        colorValue="secondary"
        classNameValue="button"
        name="닫기"
      />
    </div>
  </div>
);

export default ReserveResolvedText;
