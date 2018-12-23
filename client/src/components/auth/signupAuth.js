import React from 'react';

import SingleButton from '../../shared/singleButton';

const SignupAuth = ({ handleClose }) => (
  <React.Fragment>
    <p className="lh-1">
      죄송합니다. <br />
      유청 고객님께 좀 더 나은 서비스를 제공하고자 서버를 준비중입니다.
      <br />
    </p>
    <SingleButton
      handleButtonClick={handleClose}
      variantType="outlined"
      buttonName="닫기"
    />
  </React.Fragment>
);

export default SignupAuth;
