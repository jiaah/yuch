import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { twoYearsAgo, inTwoYears, formattedTmr } from '../../../helpers/moment';
import {
  formatToYearDateForm,
  formatToYYYYMM,
  formatToDateForm,
} from '../../../utils/date';
import DateButtons from '../../../shared/form/dateButtons';
import Paper from '../../../shared/paper';
import Table from './specialMealTable';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import Loader from '../../loader';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as specialMealActions from '../../../actions/specialMealAction';
import * as selectedActions from '../../../actions/selectedAction';
import { getUsers } from '../../../actions/adminAccountAction';

const ModalControlloer = Loader({
  loader: () => import('./modalController' /* webpackChunkName: 'BankModal' */),
});

const SpecialMealContainer = ({
  date,
  clickedUserData,
  selectedItemValue,
  specialMealActions: {
    getSpecialMeal,
    createSpecialMeal,
    updateSpecialMeal,
    deleteSpecialMeal,
  },
  selectedActions: {
    saveClickedItemData,
    resetClickedItemData,
    saveSelectedItemValue,
    resetSelectedItemValue,
  },
  dateTrackerActions: { updateDate, resetDate },
  modalActions: { showModal, hideModal },
  addFlashMessage,
  getUsers,
}) => {
  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToYearDateForm(date);

  const [specialMeal, setSpecialMeal] = useState(null);
  // show modal
  const [clickedBtn, setClickedBtn] = useState(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onFocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyymm = formatToYYYYMM(when);

    const res = await getSpecialMeal(yyyymm);

    if (res.error) {
      setSpecialMeal([]);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSpecialMeal(res);
  };

  useEffect(() => {
    fetchData(date);
    return () =>
      Promise.all([
        resetDate(),
        hideModal(),
        offFocusOnSelectdRow(),
        resetClickedItemData(),
        resetSelectedItemValue(),
      ]);
  }, []);

  const handleButtonClick = async sub => {
    await setClickedBtn(sub);
    return showModal();
  };

  return (
    <div className="container-a w-95">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        특식 관리
      </h2>
      <DateButtons
        reload={true}
        monthlyUnit={true}
        startTime={twoYearsAgo}
        endTime={inTwoYears}
        formattedDate={formattedDate}
        date={date}
        updateDate={updateDate}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-end">
        {/* <SearchBar
          data={specialMeal}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={handleResetSearch}
        /> */}
        <div>
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="add"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          />
        </div>
      </div>
      {specialMeal && (
        <Paper
          component={
            <Table
              data={specialMeal}
              selectedRow={selectedRow}
              selectedItemValue={selectedItemValue}
              saveClickedItemData={saveClickedItemData}
              saveSelectedItemValue={saveSelectedItemValue}
              handleButtonClick={handleButtonClick}
              onFocusOnSelectdRow={onFocusOnSelectdRow}
              resetSelectedItemValue={resetSelectedItemValue}
              formatToDateForm={formatToDateForm}
            />
          }
        />
      )}
      <ModalControlloer
        clickedBtn={clickedBtn}
        formattedTmr={formattedTmr}
        clickedUserData={clickedUserData}
        selectedItemValue={selectedItemValue}
        hideModal={hideModal}
        addFlashMessage={addFlashMessage}
        createSpecialMeal={createSpecialMeal}
        updateSpecialMeal={updateSpecialMeal}
        deleteSpecialMeal={deleteSpecialMeal}
        resetClickedItemData={resetClickedItemData}
        getUsers={getUsers}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
  clickedUserData: state.selected.data,
  selectedItemValue: state.selected.value,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  modalActions: bindActionCreators(modalActions, dispatch),
  specialMealActions: bindActionCreators(specialMealActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecialMealContainer);
