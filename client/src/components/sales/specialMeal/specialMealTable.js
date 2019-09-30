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
  users,
  // local state
  selectedRow,
  // global state
  selectedItemValue,
  clickedUserData,
  // actions
  saveClickedItemData,
  // func
  formatToDateForm,
  handleButtonClick,
  handleTableRowClick,
}) => {
  const getClickedUserData = async id => {
    const filteredData = await users.filter(b => b.id === id);
    return filteredData[0];
  };

  const handleEditBtnClick = async id => {
    const selectedData = await getClickedUserData(id);
    await saveClickedItemData(selectedData);
    return handleButtonClick('edit');
  };

  const handleDeleteBtnClick = async id => {
    await saveClickedItemData(id);
    return handleButtonClick('delete');
  };

  const emptyRows = users && 9 - users.length;

  // to render only one user on search.
  const searchUser = users.filter(u => u.companyName === selectedItemValue);
  const dataToDisplay = searchUser.length === 0 ? users : searchUser;

  return (
    <div id="print" className={tableWrapper}>
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead list={specialMealTableHeadColumns} />
        <TableBody data-testid="bank-account--table">
          {users &&
            users.length !== 0 &&
            dataToDisplay.map((row, index) => {
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
                  clickedUserData={clickedUserData}
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
