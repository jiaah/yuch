import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import Loader from '../../loader';
import {
  employeeColumns,
  employeeContactColumns,
  employeeBankColumns,
  admin,
} from '../../../data/data';
import { printDiv } from '../../../utils/print';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Select from '../../../shared/form/select';
import Paper from './employeesPaper';
/* --- Actions --- */
import * as modalActions from '../../../actions/modalAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as partnerActions from '../../../actions/partnerAction';

const Modal = Loader({
  loader: () => import('./employeeModal' /* webpackChunkName: 'Modal' */),
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
  employees,
}) => {
  const [data, setData] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onFocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  const fetchData = async () => {
    const res = await getEmployees();
    if (res.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    return setData(res);
  };

  useEffect(() => {
    fetchData();
    return () => {
      Promise.all([
        clickedUserData.length !== 0 && resetClickedItemData(),
        selectedSearchItem && resetSelectedItemValue(),
      ]);
    };
  }, []);

  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal(), offFocusOnSelectdRow()]);
  };

  // Row Focusing
  const handleTableRowClick = id => {
    // select
    onFocusOnSelectdRow(id);
    // search
    if (selectedSearchItem) resetSelectedItemValue();
    // create, edit
    if (clickedUserData.length !== 0) resetClickedItemData();
  };
  const handleSuggestionSelected = () => {
    if (selectedRow) offFocusOnSelectdRow();
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  const width =
    employees === '전체'
      ? 'r--w-80'
      : employees === '연락처'
        ? 'r--w-40'
        : 'r--w-50';

  return (
    <div id="print" className={`container-a ${width}`}>
      <div className="print-width print-tc">
        <h2>{`${admin.companyName} 직원`}</h2>
        <div className="paper-label-box justify-between pt2">
          <div>
            <SearchBar
              data={data}
              searchingProp="name"
              handleSuggestionSelected={handleSuggestionSelected}
              handleResetSearch={() => {}}
            />
          </div>
          <div className="flex">
            <Select
              label=""
              name="employees"
              selectedValue={employees}
              options={[
                { value: '전체' },
                { value: '계좌' },
                { value: '연락처' },
              ]}
              size="small"
            />
            {employees === '전체' && (
              <IconButton
                handleClick={() => handleButtonClick('create')}
                name="personAdd"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              />
            )}
            <div className="tablet employee-icon-print">
              <IconButton
                name="print"
                width="32"
                height="32"
                viewBox="0 0 25 25"
                handleClick={() => printDiv('print')}
              />
            </div>
          </div>
        </div>
        <Paper
          data={data}
          clickedBtn={clickedBtn}
          selectedRow={selectedRow}
          employees={employees}
          clickedUserData={clickedUserData}
          selectedSearchItem={selectedSearchItem}
          saveClickedItemData={saveClickedItemData}
          saveSelectedItemValue={saveSelectedItemValue}
          handleButtonClick={handleButtonClick}
          handleTableRowClick={handleTableRowClick}
          employeeColumns={employeeColumns}
          employeeContactColumns={employeeContactColumns}
          employeeBankColumns={employeeBankColumns}
        />
      </div>
      {clickedBtn && (
        <Modal
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          selectedSearchItem={selectedSearchItem}
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          resetSelectedItemValue={resetSelectedItemValue}
          saveClickedItemData={saveClickedItemData}
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
  employees: state.selected.employees,
  partners: state.data.data,
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
