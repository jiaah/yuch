import React from 'react';
/* --- Components --- */
import Paper from '../../../shared/paper';
import CateringTable from './cateringTable';

const CateringPaper = ({
  // local state
  users,
  editIndex,
  selectedRow,
  // global state
  selectedItemValue,
  // actions
  updateUserCatering,
  addFlashMessage,
  saveSelectedItemValue,
  resetSelectedItemValue,
  // funcs
  startEditing,
  endEditing,
  handleTableRowClick,
}) => {
  let sortedDataA;
  let sortedDataB;
  if (users && users.length <= 10) {
    sortedDataA = users;
    sortedDataB = [];
  }
  if (users && users.length > 10) {
    const line =
      users.length % 2 === 0 ? users.length / 2 : users.length / 2 + 0.5;
    sortedDataA = users.slice(0, line);
    sortedDataB = users.slice(line, users.length);
  }

  return (
    <div id="print" className="paper">
      {users.length !== 0 ? (
        <React.Fragment>
          <Paper
            isDivided={true}
            component={
              <CateringTable
                sortedData={sortedDataA}
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
              />
            }
          />
          <Paper
            classname="paper--sec"
            isDivided={true}
            component={
              <CateringTable
                sortedData={sortedDataB}
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
              />
            }
          />
        </React.Fragment>
      ) : (
        <Paper
          component={
            <h3 className="mt4 mb4">등록된 위탁급식 고객이 없습니다.</h3>
          }
        />
      )}
    </div>
  );
};

export default CateringPaper;
