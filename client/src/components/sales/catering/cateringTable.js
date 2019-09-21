import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import { promises } from 'fs';
import EnhancedTableHead from '../../../shared/tableHeadwithSortLabel';
import CateringTableRow from './cateringTableRow';
import * as data from '../../../data/data';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    minWidth: '500px',
  },
});

const CateringTable = ({
  classes: { tableWrapper, table },
  // local states
  order,
  orderBy,
  sortedData,
  // global states
  selectedSearchItem,
  // fncs
  handleRequestSort,
  // actions
  updateUserCatering,
  addFlashMessage,
  saveSelectedItemValue,
  resetSelectedItemValue,
}) => {
  const [dataToDisplay, setDataToDisplay] = useState(sortedData);

  // switch text <-> textfield
  const [editIndex, setEditIndex] = useState(null);
  const startEditing = id => setEditIndex(id);
  const endEditing = () => setEditIndex(null);

  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  const handleChange = (e, name, id) => {
    const { value } = e.target;
    const convertedValue = value === '' ? null : value;

    setDataToDisplay(
      dataToDisplay.map(
        row => (row.userId === id ? { ...row, [name]: convertedValue } : row),
      ),
    );
  };

  const updateMealQty = async userId => {
    // setSubmitting(true)
    const values = await dataToDisplay.filter(row => {
      if (row.userId === userId) {
        return {
          companyName: row.companyName,
          date: row.date,
          lunchQty: row.lunchQty,
          dinnerQty: row.dinnerQty,
          lateNightSnackQty: row.lateNightSnackQty,
        };
      }
      return null;
    });

    const res = await updateUserCatering(userId, values[0]);
    if (res.error) {
      return addFlashMessage(
        'error',
        `${
          values[0].companyName
        } 식수 등록에 실패하였습니다. 다시 시도해주세요.`,
      );
    }
    await Promise.all([
      addFlashMessage(
        'success',
        `${values[0].companyName} 식수 등록되었습니다.`,
      ),
      endEditing(),
      resetSelectedItemValue(),
      // setSubmitting(false)
    ]);
    return window.location.reload(true);
  };

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            list={data.usersCateringTableHeadColumns}
          />
          <TableBody>
            {sortedData.length !== 0 &&
              dataToDisplay.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <CateringTableRow
                    key={row.userId}
                    row={row}
                    labelId={labelId}
                    selectedSearchItem={selectedSearchItem}
                    updateUserCatering={updateUserCatering}
                    handleChange={handleChange}
                    updateMealQty={updateMealQty}
                    startEditing={startEditing}
                    endEditing={endEditing}
                    editIndex={editIndex}
                    saveSelectedItemValue={saveSelectedItemValue}
                    resetSelectedItemValue={resetSelectedItemValue}
                  />
                );
              })}
            {emptyRows > 0 && <TableRow style={{ height: 49 * emptyRows }} />}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(CateringTable);
