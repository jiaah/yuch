import React from 'react';
/* --- Components --- */
import IconMessage from '../iconMessage';
import {
  adminVerificationMessage,
  adminVerificationMessageOnDelete,
} from '../../data/message';

const VerificationMessage = ({ type }) => (
  <React.Fragment>
    {type === 'delete' && (
      <React.Fragment>
        <div className="flex justify-center mb3">
          <IconMessage
            name="warning"
            width="28"
            height="28"
            viewBox="0 0 25 25"
            fillOuter="#ed4337"
            fillInner="#ffffff"
            text="데이터가 시스템에서 삭제 됩니다. 삭제된 데이터는 복구할수없습니다."
            classes="icon-message--warning"
          />
        </div>
        {adminVerificationMessageOnDelete}
      </React.Fragment>
    )}
    {(type === 'edit' || type === 'create') && (
      <p>{adminVerificationMessage}</p>
    )}
  </React.Fragment>
);

export default VerificationMessage;
