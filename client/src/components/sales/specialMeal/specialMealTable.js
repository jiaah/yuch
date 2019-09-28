import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { specialMealTableHeadColumns } from '../../../data/data';
import SpecialMealTableRow from './specialMealTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const SpecialMealTable = ({
  classes: { tableWrapper, table },
  data,
  // local state
  selectedRow,
  // actions
  saveClickedItemData,
  saveSelectedItemValue,
  // func
  formatToDateForm,
  onfocusOnSelectdRow,
  handleButtonClick,
}) => {
  const handleTableRowClick = id => onfocusOnSelectdRow(id);

  const getClickedUserData = async id => {
    const filteredData = await data.filter(b => b.id === id);
    return filteredData[0];
  };

  const handleEditBtnClick = async id => {
    const selectedData = await getClickedUserData(id);
    await saveClickedItemData(selectedData);
    return handleButtonClick('edit');
  };

  const handleDeleteBtnClick = async id => {
    await saveSelectedItemValue(id);
    return handleButtonClick('delete');
  };

  const emptyRows = data && 9 - data.length;

  return (
    <div id="print" className={tableWrapper}>
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead list={specialMealTableHeadColumns} />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            data.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <SpecialMealTableRow
                  key={row.id}
                  handleTableRowClick={handleTableRowClick}
                  handleEditBtnClick={handleEditBtnClick}
                  handleDeleteBtnClick={handleDeleteBtnClick}
                  row={row}
                  labelId={labelId}
                  formatToDateForm={formatToDateForm}
                  selectedRow={selectedRow}
                />
              );
            })}
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(SpecialMealTable);
