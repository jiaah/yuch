import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import IconButton from './iconButton';
import {
  dayBefore,
  dayAfter,
  weekBefore,
  weekAfter,
  monthBefore,
  monthAfter,
  yearBefore,
  yearAfter,
} from '../../utils/date';
/* --- Actions --- */
import { updateDate, updateDateMm } from '../../actions/dateTrackerAction';
import { addFlashMessage } from '../../actions/messageAction';

const DateButtons = ({
  reload,
  monthlyUnit,
  renderLastMonth,
  startTime,
  endTime,
  dateForwardMessage,
  formattedDate,
  // funcs
  fetchData,
  // global state
  date,
  // actions
  updateDate,
  updateDateMm,
  addFlashMessage,
}) => {
  const handleDateBackward = async newDate => {
    if (newDate >= startTime) {
      if (renderLastMonth) {
        await updateDateMm(newDate);
      } else {
        await updateDate(newDate);
      }
      fetchData(newDate);
      if (reload) {
        return window.location.reload(true);
      }
      return null;
    }
    return addFlashMessage('info', '존재하지 않는 페이지입니다.');
  };

  const handleDateForward = async newDate => {
    if (newDate < endTime) {
      if (renderLastMonth) {
        await updateDateMm(newDate);
      } else {
        await updateDate(newDate);
      }
      fetchData(newDate);
      if (reload) {
        return window.location.reload(true);
      }
      return null;
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
  const moveToAMonthBefore = async () => {
    const newDate = await monthBefore(date);
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
  const moveToAMonthAfter = async () => {
    const newDate = await monthAfter(date);
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
        handleClick={monthlyUnit ? moveToAMonthBefore : moveToADayBefore}
      />
      {formattedDate}
      <IconButton
        name="arrowForward"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        handleClick={monthlyUnit ? moveToAMonthAfter : moveToADayAfter}
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

const mapDispatchToProps = dispatch => ({
  updateDate: date => dispatch(updateDate(date)),
  updateDateMm: date => dispatch(updateDateMm(date)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DateButtons);
