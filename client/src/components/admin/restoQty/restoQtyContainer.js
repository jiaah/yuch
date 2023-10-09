import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inAWeek } from '../../../helpers/moment';
import { formatToDateForm } from '../../../utils/date';
import { admin } from '../../../data/data.js';
import { adminCateringMsg } from '../../../data/message';
import DateButtons from '../../../shared/form/dateButtons';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import CateringPaper from '../catering/cateringPaper';
import {
  keepScrollPosition,
  saveYposition,
  scrollToElement,
} from '../../../helpers/scrollPosition';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { fetchUsersResto } from '../../../actions/restoAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as selectedActions from '../../../actions/selectedAction';

const RestoQtyContainer = ({
  guide,
  date,
  selectedItemValue,
  fetchUsersResto,
  dateTrackerActions: { updateDateDaily, resetDateDaily },
  cateringActions: { updateUserCatering },
  selectedActions: { saveSelectedItemValue, resetSelectedItemValue },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);

  // switch text <-> textfield
  const [editIndex, setEditIndex] = useState(null);
  const startEditing = id => setEditIndex(id);
  const endEditing = () => setEditIndex(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  // YYYYMMDD -> 'MM 월 DD 일 (ddd)'
  const formattedDate = formatToDateForm(date);

  const fetchData = async when => {
    const res = await fetchUsersResto(when);

    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }

    if(guide === '전체'){
      setCatering(res);
    } else {
      // 등록된 식수가 있는 업체 목록을 반환하기
      const filtered = res.filter((item)=> Boolean(item.lunchQty || item.dinnerQty || item.lateNightSnackQty))
      setCatering(filtered);
    }

    return keepScrollPosition();
  };

  useEffect(() => {
    fetchData(date);

    return () => {
      Promise.all([
        resetDateDaily(),
        selectedItemValue && resetSelectedItemValue(),
      ]);
    };
  }, [guide]);

  const handleTableRowClick = (e, id) => {
    const { tagName } = e.target;
    onfocusOnSelectdRow(id);
    // if selected row is editing row, do not close editing mode.
    if (id !== editIndex) endEditing();
    if (tagName !== 'INPUT' && selectedItemValue) resetSelectedItemValue();
  };

  const handleSuggestionSelected = data =>
    Promise.all([
      scrollToElement(data.userId),
      editIndex && endEditing(),
      selectedRow && offFocusOnSelectdRow(),
    ]);

  const handleResetSearch = () => {};

  const width = catering && catering.length > 10 ? 'r--w-80' : 'r--w-50';
  return (
    <React.Fragment>
      {catering && (
        <div className={`container-a ${width}`}>
          <div id="print">
            <div className="print-width print-tc">
              <h2
                className="pointer"
                title="오늘 날짜로 돌아가기"
                onClick={resetDateDaily}
              >
                식당 식수 현황
              </h2>
              <DateButtons
                date={date}
                reload={true}
                unit="dd"
                formattedDate={formattedDate}
                startTime={admin.startTime}
                endTime={inAWeek}
                updateDate={updateDateDaily}
                addFlashMessage={addFlashMessage}
                fetchData={fetchData}
                dateForwardMessage="7일 내의 식수량만 미리 등록 할 수 있습니다."
              />
              <div className="center">
                <div className="paper-label-box justify-between">
                  <SearchBar
                    data={catering}
                    searchingProp="companyName"
                    handleSuggestionSelected={handleSuggestionSelected}
                    handleResetSearch={handleResetSearch}
                  />
                  <div className="flex">
                    <Select
                      label=""
                      name="guide"
                      selectedValue={guide}
                      options={[{ value: '전체' }, { value: '식수 있는 업체' }]}
                      size="small"
                    />
                    <IconButton
                      name="print"
                      width="32"
                      height="32"
                      viewBox="0 0 25 25"
                      handleClick={() => printDiv('print')}
                    />
                  </div>
                </div>
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
                  handleTableRowClick={handleTableRowClick}
                  selectedRow={selectedRow}
                  saveYposition={saveYposition}
                />
              </div>
            </div>
          </div>
          {adminCateringMsg}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
  catering: state.userCatering.caterings,
  selectedItemValue: state.selected.value,
  guide: state.selected.guide,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  cateringActions: bindActionCreators(cateringActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  fetchUsersResto: date => dispatch(fetchUsersResto(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoQtyContainer);
