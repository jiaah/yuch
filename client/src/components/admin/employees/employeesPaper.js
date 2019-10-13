import React from 'react';
/* --- Components --- */
import Paper from '../../../shared/paper';
import Table from './employeeTable';
import ContactTable from './employeeContactTable';

const EmployeesPaper = ({
  // local state
  data,
  clickedBtn,
  selectedRow,
  // global state
  employees,
  clickedUserData,
  selectedSearchItem,
  // actions
  saveClickedItemData,
  saveSelectedItemValue,
  // func
  handleButtonClick,
  handleTableRowClick,
  // columns
  employeeColumns,
  employeeContactColumns,
  employeeBankColumns,
}) => (
  <React.Fragment>
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
    ) : employees === '연락처' ? (
      <Paper
        component={
          <ContactTable
            data={data}
            selectedRow={selectedRow}
            selectedSearchItem={selectedSearchItem}
            handleTableRowClick={handleTableRowClick}
            employeeContactColumns={employeeContactColumns}
            listType="contact"
          />
        }
      />
    ) : (
      <Paper
        component={
          <ContactTable
            data={data}
            selectedRow={selectedRow}
            selectedSearchItem={selectedSearchItem}
            handleTableRowClick={handleTableRowClick}
            employeeBankColumns={employeeBankColumns}
            listType="bank"
          />
        }
      />
    )}
  </React.Fragment>
);

export default EmployeesPaper;
