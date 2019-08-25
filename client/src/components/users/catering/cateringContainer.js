import React from 'react';
/* --- Components --- */
import { dateInKorean } from '../../../helpers/moment';
import IconButton from '../../../shared/form/iconButton';

const CateringContainer = () => {
  const handleDateBackward = () => console.log('backward');
  const handleDateForward = () => console.log('forward');
  return (
    <div className="container">
      <h2>식수현황</h2>
      <div>
        <IconButton
          name="arrowBack"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateBackward}
        />
        {dateInKorean}
        <IconButton
          name="arrowForward"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateForward}
        />
      </div>
    </div>
  );
};

export default CateringContainer;
