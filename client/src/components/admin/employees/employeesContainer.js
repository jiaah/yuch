import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import Paper from '../../../shared/paper';
import Loader from '../../loader';
import Table from './employeeTable';
import ContactTable from './employeeContactTable';
import {
  employeeColumns,
  employeeContactColumns,
  admin,
} from '../../../data/data';
import { printDiv } from '../../../utils/print';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Select from '../../../shared/form/select';
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
  const [data, setData] = useState([]);
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

  return (
    <div className="container-a r--w-80">
      <h2>{`${admin.companyName} 직원`}</h2>
      <div className="paper-label-box justify-between">
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
            options={[{ value: '전체' }, { value: '연락처' }]}
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
      <div id="print">
        {data && data.length === 0 ? (
          <Paper
            component={<h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>}
          />
        ) : employees === '전체' ? (
          <Paper
            component={
              <Table
                data={data}
                clickedBtn={clickedBtn}
                selectedRow={selectedRow}
                selectedSearchItem={selectedSearchItem}
                saveClickedItemData={saveClickedItemData}
                saveSelectedItemValue={saveSelectedItemValue}
                handleButtonClick={handleButtonClick}
                handleTableRowClick={handleTableRowClick}
                employeeColumns={employeeColumns}
                clickedUserData={clickedUserData[0] || clickedUserData}
                employees={employees}
              />
            }
          />
        ) : (
          <Paper
            isDivided={true}
            classname="center"
            component={
              <ContactTable
                data={data}
                selectedRow={selectedRow}
                selectedSearchItem={selectedSearchItem}
                handleTableRowClick={handleTableRowClick}
                employeeContactColumns={employeeContactColumns}
              />
            }
          />
        )}
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
  partners: state.partner.data,
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
