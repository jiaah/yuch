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
  date,
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
  // helpers
  saveYposition,
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
    <div id="print" className="paper users-catering--width">
      <Paper
        component={
          <CateringTable
            date={date}
            sortedData={sortedDataA}
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
          />
        }
      />
      <Paper
        classes="paper--sec"
        component={
          <CateringTable
            date={date}
            sortedData={sortedDataB}
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
          />
        }
      />
    </div>
  );
};

export default CateringPaper;
