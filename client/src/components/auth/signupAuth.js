import React from 'react';

import SingleButton from '../../shared/singleButton';

const SignupAuth = ({ handleClose }) => (
  <React.Fragment>
    <p>죄송합니다. 서버를 준비중입니다.</p>
    <SingleButton
      handleButtonClick={handleClose}
      variantType="outlined"
      buttonName="닫기"
    />
  </React.Fragment>
);

export default SignupAuth;
