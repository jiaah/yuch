import React, { useState } from 'react';
import IconButton from '../../shared/form/iconButton';
import { headerMsgA, headerMsgB, headerMsgC } from '../../data/message';

const Header = () => {
  const messages = [headerMsgA, headerMsgB, headerMsgC];
  // to stop header messages auto change when user clicks an arrow button
  const [arrowBtnTouched, setArrowBtnTouched] = useState(false);

  const [msg, setMsg] = useState(0);
  const handleLeftButtonClick = () => {
    if (msg !== 0) setMsg(msg - 1);
    if (!arrowBtnTouched) setArrowBtnTouched(true);
  };
  const handleRightButtonClick = () => {
    if (msg !== messages.length - 1) setMsg(msg + 1);
    if (!arrowBtnTouched) setArrowBtnTouched(true);
  };

  setTimeout(() => {
    if (!arrowBtnTouched) {
      if (msg < messages.length - 1) return setMsg(msg + 1);
      return setMsg(0);
    }
  }, 4500);

  return (
    <header>
      <div className="flex justify-between header--center">
        <IconButton
          handleClick={() => handleLeftButtonClick()}
          name="arrowLeft"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          color="white"
        />
        <IconButton
          handleClick={() => handleRightButtonClick()}
          name="arrowRight"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          color="white"
        />
      </div>
      <React.Fragment>{messages[msg]}</React.Fragment>
    </header>
  );
};

export default Header;
