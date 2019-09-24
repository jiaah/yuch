import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import TableHead from '../../../shared/tableHead';
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
  sortedData,
  editIndex,
  selectedRow,
  // global states
  date,
  selectedItemValue,
  // actions
  updateUserCatering,
  addFlashMessage,
  saveSelectedItemValue,
  resetSelectedItemValue,
  // fncs
  startEditing,
  endEditing,
  handleTableRowClick,
}) => {
  const [dataToDisplay, setDataToDisplay] = useState(sortedData);
  const [isSubmitting, setSubmitting] = useState(false);

  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  const handleChange = (e, name, id) => {
    const { value } = e.target;
    let convertedValue;

    if (value !== '') {
      convertedValue = isNaN(value) ? value : parseInt(value, 10);
    } else {
      convertedValue = null;
    }

    setDataToDisplay(
      dataToDisplay.map(
        row => (row.userId === id ? { ...row, [name]: convertedValue } : row),
      ),
    );
  };

  const updateMealQty = async userId => {
    await setSubmitting(true);
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
      addFlashMessage(
        'error',
        `${
          values[0].companyName
        } 식수 등록에 실패하였습니다. 다시 시도해주세요.`,
      );
    } else {
      await Promise.all([
        addFlashMessage(
          'success',
          `${values[0].companyName} 식수 등록되었습니다.`,
        ),
        endEditing(),
      ]);
    }
    setSubmitting(false);
    return window.location.reload(true);
  };

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="tableTitle">
          <TableHead list={data.usersCateringTableHeadColumns} />
          <TableBody>
            {sortedData.length !== 0 &&
              dataToDisplay.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <CateringTableRow
                    key={row.userId}
                    row={row}
                    labelId={labelId}
                    selectedItemValue={selectedItemValue}
                    updateUserCatering={updateUserCatering}
                    handleChange={handleChange}
                    updateMealQty={updateMealQty}
                    startEditing={startEditing}
                    endEditing={endEditing}
                    editIndex={editIndex}
                    saveSelectedItemValue={saveSelectedItemValue}
                    resetSelectedItemValue={resetSelectedItemValue}
                    isSubmitting={isSubmitting}
                    handleTableRowClick={handleTableRowClick}
                    selectedRow={selectedRow}
                    date={date}
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

// 'orderBy' doesn't work as 'dataToDisplay' is saved in state in order to handle input change.
// if 'sortedData' is used to map, 'orderBy' works.
// Using Formik would not work either as it uses its own state to handle input change.
// besides Formik can only get the whole dataToDisplay values on submit instead of the changed row data
// because Form can not be a child of Table.
