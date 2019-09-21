import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import CateringTable from './cateringTable';

const CateringPaper = ({
  // local state
  users,
  editIndex,
  // global state
  selectedSearchItem,
  // actions
  updateUserCatering,
  addFlashMessage,
  saveSelectedItemValue,
  resetSelectedItemValue,
  // funcs
  startEditing,
  endEditing,
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
            sortedData={sortedDataA}
            selectedSearchItem={selectedSearchItem}
            updateUserCatering={updateUserCatering}
            addFlashMessage={addFlashMessage}
            saveSelectedItemValue={saveSelectedItemValue}
            resetSelectedItemValue={resetSelectedItemValue}
            startEditing={startEditing}
            endEditing={endEditing}
            editIndex={editIndex}
            saveYposition={saveYposition}
          />
        }
      />
      <Paper
        classes="paper--sec"
        component={
          <CateringTable
            sortedData={sortedDataB}
            selectedSearchItem={selectedSearchItem}
            updateUserCatering={updateUserCatering}
            addFlashMessage={addFlashMessage}
            saveSelectedItemValue={saveSelectedItemValue}
            resetSelectedItemValue={resetSelectedItemValue}
            startEditing={startEditing}
            endEditing={endEditing}
            editIndex={editIndex}
            saveYposition={saveYposition}
          />
        }
      />
    </div>
  );
};

export default CateringPaper;
