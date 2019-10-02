import React, { useState } from 'react';
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

  // error handler
  const [lunchQtyErr, setLunchQtyErr] = useState(false);
  const [dinnerQtyErr, setDinnerQtyErr] = useState(false);
  const [lateNightSnackQtyErr, setLateNightSnackQtyErr] = useState(false);

  const validation = values => {
    if (typeof values.lunchQty !== 'number' && values.lunchQty !== null) {
      setLunchQtyErr(true);
    } else {
      setLunchQtyErr(false);
    }
    if (typeof values.dinnerQty !== 'number' && values.dinnerQty !== null) {
      setDinnerQtyErr(true);
    } else {
      setDinnerQtyErr(false);
    }
    if (
      typeof values.lateNightSnackQty !== 'number' &&
      values.lateNightSnackQty !== null
    ) {
      setLateNightSnackQtyErr(true);
    } else {
      setLateNightSnackQtyErr(false);
    }
  };

  const handleUpdate = async (userId, values) => {
    if (!lunchQtyErr && !dinnerQtyErr && !lateNightSnackQtyErr) {
      const res = await updateUserCatering(userId, values);
      if (res.error) {
        addFlashMessage(
          'error',
          `${
            values.companyName
          } 식수 등록에 실패하였습니다. 다시 시도해주세요.`,
        );
      } else {
        await Promise.all([
          addFlashMessage(
            'success',
            `${values.companyName} 식수 등록되었습니다.`,
          ),
          endEditing(),
        ]);
        window.location.reload(true);
      }
    }
  };

  return (
    <div id="print" className="paper">
      {users.length !== 0 && users.length > 10 ? (
        <React.Fragment>
          <Paper
            isDivided={true}
            component={
              <CateringTable
                sortedData={sortedDataA}
                selectedItemValue={selectedItemValue}
                updateUserCatering={updateUserCatering}
                saveSelectedItemValue={saveSelectedItemValue}
                resetSelectedItemValue={resetSelectedItemValue}
                startEditing={startEditing}
                endEditing={endEditing}
                editIndex={editIndex}
                handleTableRowClick={handleTableRowClick}
                selectedRow={selectedRow}
                handleUpdate={handleUpdate}
                validation={validation}
                lunchQtyErr={lunchQtyErr}
                dinnerQtyErr={dinnerQtyErr}
                lateNightSnackQtyErr={lateNightSnackQtyErr}
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
                saveSelectedItemValue={saveSelectedItemValue}
                resetSelectedItemValue={resetSelectedItemValue}
                startEditing={startEditing}
                endEditing={endEditing}
                editIndex={editIndex}
                handleTableRowClick={handleTableRowClick}
                selectedRow={selectedRow}
                handleUpdate={handleUpdate}
                validation={validation}
                lunchQtyErr={lunchQtyErr}
                dinnerQtyErr={dinnerQtyErr}
                lateNightSnackQtyErr={lateNightSnackQtyErr}
              />
            }
          />
        </React.Fragment>
      ) : users.length !== 0 && users.length <= 10 ? (
        <Paper
          component={
            <CateringTable
              sortedData={sortedDataA}
              selectedItemValue={selectedItemValue}
              updateUserCatering={updateUserCatering}
              saveSelectedItemValue={saveSelectedItemValue}
              resetSelectedItemValue={resetSelectedItemValue}
              startEditing={startEditing}
              endEditing={endEditing}
              editIndex={editIndex}
              handleTableRowClick={handleTableRowClick}
              selectedRow={selectedRow}
              handleUpdate={handleUpdate}
              validation={validation}
              lunchQtyErr={lunchQtyErr}
              dinnerQtyErr={dinnerQtyErr}
              lateNightSnackQtyErr={lateNightSnackQtyErr}
            />
          }
        />
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
