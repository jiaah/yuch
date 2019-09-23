import React from 'react';
/* --- Components --- */
import IconButton from './iconButton';
import {
  dayBefore,
  dayAfter,
  weekBefore,
  weekAfter,
  yearBefore,
  yearAfter,
  formatToDateForm,
} from '../../utils/date';

const DateButtons = ({
  monthlyUnit,
  startTime,
  endTime,
  dateForwardMessage,
  // state
  date,
  // actions
  updateDate,
  addFlashMessage,
  // funcs
  fetchData,
}) => {
  // YYYYMMDD -> 'MM 월 DD 일 (ddd)'
  const formattedDate = formatToDateForm(date);

  const handleDateBackward = async newDate => {
    if (newDate >= startTime) {
      await updateDate(newDate);
      fetchData(newDate);
      return window.location.reload(true);
    }
    return addFlashMessage('info', '존재하는 데이터가 없습니다.');
  };

  const handleDateForward = async newDate => {
    if (newDate < endTime) {
      await updateDate(newDate);
      fetchData(newDate);
      return window.location.reload(true);
    }
    return addFlashMessage('info', dateForwardMessage);
  };

  const moveToAWeekBefore = async () => {
    const newDate = await weekBefore(date);
    return handleDateBackward(newDate);
  };
  const moveToADayBefore = async () => {
    const newDate = await dayBefore(date);
    return handleDateBackward(newDate);
  };
  const moveToYearBefore = async () => {
    const newDate = await yearBefore(date);
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
  const moveToAYearAfter = async () => {
    const newDate = await yearAfter(date);
    return handleDateForward(newDate);
  };

  return (
    <div>
      <IconButton
        name="arrowLeft"
        width="20"
        height="22"
        viewBox="0 0 30 30"
        handleClick={monthlyUnit ? moveToYearBefore : moveToAWeekBefore}
      />
      <IconButton
        name="arrowBack"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        handleClick={monthlyUnit ? moveToAWeekBefore : moveToADayBefore}
      />
      {formattedDate}
      <IconButton
        name="arrowForward"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        handleClick={monthlyUnit ? moveToAWeekAfter : moveToADayAfter}
      />
      <IconButton
        name="arrowRight"
        width="20"
        height="22"
        viewBox="0 0 30 30"
        handleClick={monthlyUnit ? moveToAYearAfter : moveToAWeekAfter}
      />
    </div>
  );
};

export default DateButtons;
