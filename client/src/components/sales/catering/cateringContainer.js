import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
import { adminCateringMsg } from '../../../data/message';
import DateButtons from '../../../shared/form/dateButtons';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import CateringPaper from './cateringPaper';
import {
  keepScrollPosition,
  saveYposition,
} from '../../../helpers/scrollPosition';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as selectedActions from '../../../actions/selectedAction';

const CateringContainer = ({
  date,
  selectedItemValue,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUsersCatering, updateUserCatering },
  selectedActions: { saveSelectedItemValue, resetSelectedItemValue },
  addFlashMessage,
}) => {
  const { formatToDateForm, firstDayOfLastMonth } = dateUtils;
  const [catering, setCatering] = useState(null);

  // switch text <-> textfield
  const [editIndex, setEditIndex] = useState(null);
  const startEditing = id => setEditIndex(id);
  const endEditing = () => setEditIndex(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  const formattedDate = formatToDateForm(date);
  const startTime = firstDayOfLastMonth();

  const fetchData = async when => {
    const res = await fetchUsersCatering(when);

    if (res.error) {
      setCatering();
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }

    return setCatering(res);
  };

  useEffect(() => {
    fetchData(date);
    return () => {
      resetDate();
      resetSelectedItemValue();
    };
  }, []);

  const handleTableRowClick = id => {
    onfocusOnSelectdRow(id);
    if (editIndex) endEditing();
    if (selectedItemValue) resetSelectedItemValue();
  };

  const handleSuggestionSelected = () => {
    if (editIndex) endEditing();
    if (selectedRow) offFocusOnSelectdRow();
  };

  const handleResetSearch = () => {};

  return (
    <div className="r--w-70 container">
      <h2 className="pointer" title="오늘 날짜로 돌아가기" onClick={resetDate}>
        식수현황
      </h2>
      <DateButtons
        date={date}
        updateDate={updateDate}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        inAWeek={inAWeek}
        dateUtils={dateUtils}
        formattedDate={formattedDate}
        startTime={startTime}
        dateForwardMessage="7일 내의 식수량만 미리 등록 할 수 있습니다."
      />
      <div className="paper-label-box flex justify-between users-catering--width">
        <SearchBar
          data={catering}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={handleResetSearch}
        />
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      {catering && (
        <CateringPaper
          users={catering}
          selectedItemValue={selectedItemValue}
          updateUserCatering={updateUserCatering}
          addFlashMessage={addFlashMessage}
          saveSelectedItemValue={saveSelectedItemValue}
          resetSelectedItemValue={resetSelectedItemValue}
          startEditing={startEditing}
          endEditing={endEditing}
          editIndex={editIndex}
          saveYposition={saveYposition}
          handleTableRowClick={handleTableRowClick}
          selectedRow={selectedRow}
          date={date}
        />
      )}
      {adminCateringMsg}
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
  catering: state.userCatering.caterings,
  selectedItemValue: state.selected.value,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  cateringActions: bindActionCreators(cateringActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  selectedActions: bindActionCreators(selectedActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CateringContainer);
