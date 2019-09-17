import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
// import { today, inAWeek } from '../../../helpers/moment';
// import {
//   convertToDateForm,
//   dayBefore,
//   dayAfter,
//   weekBefore,
//   weekAfter,
//   isLunchQtyChangeDisabled,
//   isDinnerQtyChangeDisabled,
// } from '../../../utils/date';
import IconButton from '../../../shared/form/iconButton';

const DateButtons = ({
  // state
  id,
  date,
  catering,
  // action
  updateDate,
  addFlashMessage,
  // func
  fetchData,
  // moment
  inAWeek,
  dateUtils,
}) => {
  const {
    convertToDateForm,
    dayBefore,
    dayAfter,
    weekBefore,
    weekAfter,
  } = dateUtils;

  const handleDateBackward = async newDate => {
    const createdAt = catering.created_at;

    if (newDate >= createdAt) {
      await updateDate(newDate);
      return fetchData(id, newDate);
    }
    return addFlashMessage('info', '존재하는 데이터가 없습니다.');
  };

  const handleDateForward = async newDate => {
    if (newDate < inAWeek) {
      await updateDate(newDate);
      return fetchData(id, newDate);
    }
    return addFlashMessage(
      'info',
      '7일 내의 식수량만 미리 등록 할 수 있습니다.',
    );
  };

  const moveToAWeekBefore = async () => {
    const newDate = await weekBefore(date);
    return handleDateBackward(newDate);
  };
  const moveToADayBefore = async () => {
    const newDate = await dayBefore(date);
    return handleDateBackward(newDate);
  };
  const moveToADayAfter = async () => {
    const newDate = await dayAfter(date);
    return handleDateForward(newDate);
  };
  const moveToAWeekAfter = async () => {
    const newDate = await weekAfter(date);
    return handleDateForward(newDate);
  };

  const displayedDate = catering && convertToDateForm(date);

  return (
    <div>
      <IconButton
        name="arrowLeft"
        width="20"
        height="22"
        viewBox="0 0 30 30"
        handleClick={moveToAWeekBefore}
      />
      <IconButton
        name="arrowBack"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        handleClick={moveToADayBefore}
      />
      {displayedDate}
      <IconButton
        name="arrowForward"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        handleClick={moveToADayAfter}
      />
      <IconButton
        name="arrowRight"
        width="20"
        height="22"
        viewBox="0 0 30 30"
        handleClick={moveToAWeekAfter}
      />
    </div>
  );
};

export default DateButtons;
