import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inTwoYears, formattedTmr, today } from '../../../helpers/moment';
import {
  formatToMonthDateForm,
  formatToYYYYMM,
  formatToDateForm,
  formatToYYYYMMDD,
} from '../../../utils/date';
import DateButtons from '../../../shared/form/dateButtons';
import Paper from '../../../shared/paper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import Loader from '../../loader';
import { admin } from '../../../data/data';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as specialMealActions from '../../../actions/specialMealAction';
import * as selectedActions from '../../../actions/selectedAction';
import { getUsers } from '../../../actions/adminAccountAction';
import IconMessage from '../../../shared/iconMessage';
import {
  adminSpecialMealMsg,
  adminSpecialMealMsgA,
  adminSpecialMealMsgB,
  adminSpecialMealMsgC,
  updateRateMessageC,
} from '../../../data/message';

const ModalControlloer = Loader({
  loader: () => import('./modalController' /* webpackChunkName: 'BankModal' */),
});

const Table = Loader({
  loader: () =>
    import('./specialMealTable' /* webpackChunkName: 'BankModal' */),
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
    resetSelectedItemValue,
  },
  dateTrackerActions: { updateDateDaily, resetDateDaily },
  modalActions: { showModal, hideModal },
  addFlashMessage,
  getUsers,
}) => {
  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToMonthDateForm(date);

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
        resetDateDaily(),
        hideModal(),
        selectedRow && offFocusOnSelectdRow(),
        clickedUserData.length !== 0 && resetClickedItemData(),
        selectedItemValue && resetSelectedItemValue(),
      ]);
  }, []);

  const handleButtonClick = async sub => {
    await setClickedBtn(sub);
    return showModal();
  };

  const handleTableRowClick = id => {
    onFocusOnSelectdRow(id);
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  // off row focus
  const handleSuggestionSelected = () => {
    if (selectedRow) offFocusOnSelectdRow();
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  // Render all users list from a selected user list [Search]
  const renderAllUsers = () => {
    // create & edit & delete
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  return (
    <div className="container-a r--w-98">
      <h2
        className="pointer"
        title="오늘 일자로 돌아가기"
        onClick={resetDateDaily}
      >
        특식 관리
      </h2>
      <DateButtons
        date={date}
        reload={true}
        unit="mm"
        formattedDate={formattedDate}
        startTime={admin.startTime}
        endTime={`${inTwoYears}01`}
        updateDate={updateDateDaily}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-between">
        <SearchBar
          data={specialMeal}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={renderAllUsers}
        />
        <div>
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="add"
            width="30"
            height="30"
            viewBox="0 0 24 24"
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
      <div id="print">
        <Paper
          isDivided={false}
          component={
            <React.Fragment>
              {specialMeal && specialMeal.length !== 0 ? (
                <Table
                  users={specialMeal}
                  selectedRow={selectedRow}
                  clickedUserData={clickedUserData[0] || clickedUserData}
                  selectedItemValue={selectedItemValue}
                  saveClickedItemData={saveClickedItemData}
                  handleButtonClick={handleButtonClick}
                  formatToDateForm={formatToDateForm}
                  handleTableRowClick={handleTableRowClick}
                  formatToYYYYMMDD={formatToYYYYMMDD}
                  today={today}
                />
              ) : (
                <h3 className="mt4 mb4">등록된 특식이 없습니다.</h3>
              )}
            </React.Fragment>
          }
        />
      </div>
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={adminSpecialMealMsg}
        position="end"
        iconBoxStyle="mt3 pw1"
        textStyle="icon-message--info"
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={adminSpecialMealMsgA}
        position="end"
        iconBoxStyle="mt2 pw1"
        textStyle="icon-message--info"
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={adminSpecialMealMsgB}
        position="end"
        iconBoxStyle="mt2 pw1"
        textStyle="icon-message--info"
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={adminSpecialMealMsgC}
        position="end"
        iconBoxStyle="mt2 pw1"
        textStyle="icon-message--info"
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={updateRateMessageC}
        position="end"
        iconBoxStyle="mt2 pw1"
        textStyle="icon-message--info"
      />
      {clickedBtn && (
        <ModalControlloer
          clickedBtn={clickedBtn}
          formattedTmr={formattedTmr}
          clickedUserData={clickedUserData}
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          createSpecialMeal={createSpecialMeal}
          updateSpecialMeal={updateSpecialMeal}
          deleteSpecialMeal={deleteSpecialMeal}
          resetSelectedItemValue={resetSelectedItemValue}
          saveClickedItemData={saveClickedItemData}
          resetClickedItemData={resetClickedItemData}
          getUsers={getUsers}
          adminSpecialMealMsg={adminSpecialMealMsg}
        />
      )}
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
