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
  table: { width: '100%' },
});

const SpecialMealTable = ({
  classes: { tableWrapper, table },
  today,
  // local state
  users,
  selectedRow,
  // global state
  selectedItemValue,
  clickedUserData,
  // actions
  saveClickedItemData,
  // func
  formatToDateForm,
  formatToYYYYMMDD,
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

  // to render only one user on search.
  const searchUser = users.filter(u => u.companyName === selectedItemValue);
  const dataToDisplay = searchUser.length === 0 ? users : searchUser;

  const emptyRows = users && 9 - users.length;

  const formattedData = users.map(u => formatToYYYYMMDD(u.date));
  const upComingEventIndex = formattedData.findIndex(i => i >= today);
  const upComingEvent = users[upComingEventIndex];

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="admin-specialmeal" size="small">
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
                  upComingEvent={upComingEvent}
                />
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={13} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(SpecialMealTable);
