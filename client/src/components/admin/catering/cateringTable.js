import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import TableHead from '../../../shared/tableHead';
import CateringTableRow from './cateringTableRow';
import * as data from '../../../data/data';
import { createForLoopArray } from '../../../utils/loop';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    minWidth: '330px',
  },
});

const CateringTable = ({
  classes: { tableWrapper, table },
  // local states
  sortedData,
  editIndex,
  selectedRow,
  // global states
  selectedItemValue,
  // actions
  saveSelectedItemValue,
  resetSelectedItemValue,
  // fncs
  startEditing,
  endEditing,
  handleTableRowClick,
  handleUpdate,
}) => {
  const [dataToDisplay, setDataToDisplay] = useState(sortedData);
  const [isSubmitting, setSubmitting] = useState(false);
  const [inputs, setInputs] = useState(null);

  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  // create inputs array to map it with ref
  const createInputArrayForRefs = async () => {
    // 4 -> number of inputs + submit button
    const res = await createForLoopArray(4, 'input');
    return setInputs(res);
  };

  useEffect(()=>{
    if(!sortedData){
      return;
    }

    setDataToDisplay(sortedData)
  },[sortedData])

  useEffect(() => {
    createInputArrayForRefs();
  }, []);

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
    await handleUpdate(userId, values[0]);
    return setSubmitting(false);
  };

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="catering" size="small">
          <TableHead list={data.usersCateringTableHeadColumns} />
          <TableBody>
            {dataToDisplay && dataToDisplay.length !== 0 &&
              dataToDisplay.map(row => (
                <CateringTableRow
                  key={row.userId}
                  row={row}
                  selectedItemValue={selectedItemValue}
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
                  inputs={inputs}
                />
              ))}
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
