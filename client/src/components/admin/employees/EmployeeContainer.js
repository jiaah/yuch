import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import Paper from '../../../shared/paper';
import Loader from '../../loader';
import Table from './Table';
import { employeeColumns } from '../../../data/data';
import { printDiv } from '../../../utils/print';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
/* --- Actions --- */
import * as modalActions from '../../../actions/modalAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as partnerActions from '../../../actions/partnerAction';

const Modal = Loader({
  loader: () => import('./Modal' /* webpackChunkName: 'Modal' */),
});

const Container = ({
  modalActions: { showModal, hideModal },
  selectedActions: {
    saveClickedItemData,
    resetClickedItemData,
    saveSelectedItemValue,
    resetSelectedItemValue,
  },
  partnerActions: {
    getEmployees,
    createEmployee,
    editEmployee,
    deleteEmployee,
  },
  addFlashMessage,
  clickedUserData,
  selectedSearchItem,
}) => {
  const [data, setData] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchBankAccount = async () => {
    const res = await getEmployees();
    if (res.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    return setData(res);
  };

  useEffect(() => {
    fetchBankAccount();
    return () => {
      Promise.all([
        clickedUserData.length !== 0 && resetClickedItemData(),
        selectedSearchItem && resetSelectedItemValue(),
      ]);
    };
  }, []);

  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal()]);
  };

  // off row focus
  const handleSuggestionSelected = () => {};

  const renderAllUsers = () => {};

  return (
    <div className="container-a r--w-80">
      <h2>유청 직원</h2>
      <div className="paper-label-box justify-between">
        <SearchBar
          data={data}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={renderAllUsers}
        />
        <div className="flex">
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
          component={
            data && data.length !== 0 ? (
              <Table
                data={data}
                clickedBtn={clickedBtn}
                saveClickedItemData={saveClickedItemData}
                saveSelectedItemValue={saveSelectedItemValue}
                handleButtonClick={handleButtonClick}
                employeeColumns={employeeColumns}
              />
            ) : (
              <h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>
            )
          }
        />
      </div>
      {clickedBtn && (
        <Modal
          data={data}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          selectedSearchItem={selectedSearchItem}
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          resetSelectedItemValue={resetSelectedItemValue}
          resetClickedItemData={resetClickedItemData}
          createEmployee={createEmployee}
          editEmployee={editEmployee}
          deleteEmployee={deleteEmployee}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  partnerActions: bindActionCreators(partnerActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
