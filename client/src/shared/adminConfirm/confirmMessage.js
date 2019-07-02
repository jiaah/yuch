import React from 'react';
/* --- Components --- */
import IconMessage from '../iconMessage';

const adminConfirmMessage = (
  <p>
    정말 삭제하시겠습니까?
    <br />
    진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </p>
);

const AdminConfirmForm = ({ type }) => (
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
        {adminConfirmMessage}
      </React.Fragment>
    )}
    {(type === 'edit' || type === 'create') && (
      <p>
        계속 진행하시려면&#44;&#8201; 보안을 위해&#8201;
        <span className="c-point2">
          {data.admin.companyName}
          님의 비밀번호
        </span>
        를 입력해주세요&#46;
      </p>
    )}
  </React.Fragment>
);

export default AdminConfirmForm;
