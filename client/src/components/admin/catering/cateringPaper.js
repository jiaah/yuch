import React from 'react';
/* --- Components --- */
import Paper from '../../../shared/paper';
import CateringTable from './cateringTable';
import { divideInTow } from '../../../utils/sort';

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
  saveYposition,
}) => {
  const handleUpdate = async (userId, values) => {
    const res = await updateUserCatering(userId, values);
    if (res.error) {
      addFlashMessage(
        'error',
        `${values.companyName} 식수 등록에 실패하였습니다. 다시 시도해주세요.`,
      );
    } else {
      await saveYposition();
      await Promise.all([
        addFlashMessage(
          'success',
          `${values.companyName} 식수 등록되었습니다.`,
        ),
        endEditing(),
      ]);
      // window.location.reload(true);
    }
  };

  const { sortedDataA, sortedDataB } = divideInTow(users);
  console.log('좌 데이터: ', sortedDataA);
  console.log('우 데이터: ', sortedDataB);

  return (
    <div className="paper">
      {users.length === 0 ? (
        <Paper
          component={<h3 className="mt4 mb4">조건에 만족하는 업체가 없습니다.</h3>}
        />
      ) : (
        <React.Fragment>
          <Paper
            isDivided={sortedDataB && sortedDataB.length > 0}
            component={
              <CateringTable
                sortedData={sortedDataA}
                selectedItemValue={selectedItemValue}
                saveSelectedItemValue={saveSelectedItemValue}
                resetSelectedItemValue={resetSelectedItemValue}
                startEditing={startEditing}
                endEditing={endEditing}
                editIndex={editIndex}
                handleTableRowClick={handleTableRowClick}
                selectedRow={selectedRow}
                handleUpdate={handleUpdate}
              />
            }
          />
          {sortedDataB && sortedDataB.length > 0 && (
            <Paper
              classname="paper--sec"
              isDivided={true}
              component={
                <CateringTable
                  sortedData={sortedDataB}
                  selectedItemValue={selectedItemValue}
                  saveSelectedItemValue={saveSelectedItemValue}
                  resetSelectedItemValue={resetSelectedItemValue}
                  startEditing={startEditing}
                  endEditing={endEditing}
                  editIndex={editIndex}
                  handleTableRowClick={handleTableRowClick}
                  selectedRow={selectedRow}
                  handleUpdate={handleUpdate}
                />
              }
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default CateringPaper;
