import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
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
  selectedRow,
  editBtnClickedRow,
  // global states
  selectedSearchItem,
  // fncs
  handleRequestSort,
  handleEditUserBtnClick,
  handleTableRowClick,
  // actions
  updateUsersCatering,
}) => {
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  useEffect(() => {
    // to render only one user on search.
    const searchUser = sortedData.filter(
      u => u.companyName === selectedSearchItem,
    );
    const userToDisplay = searchUser.length === 0 ? sortedData : searchUser;
    setDataToDisplay(userToDisplay);
  }, []);

  const handleChange = (e, name, id) => {
    const { value } = e.target;
    setDataToDisplay(
      dataToDisplay.map(
        row => (row.userId === id ? { ...row, [name]: value } : row),
      ),
    );
  };

  const updateMealQty = async id => {
    const values = await dataToDisplay.filter(row => row.userId === id);
    console.log('values: ', values);
    const res = await updateUsersCatering(values);
    console.log('res: ', res);
    endEditing();
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
                    selectedRow={selectedRow}
                    editBtnClickedRow={editBtnClickedRow}
                    handleTableRowClick={handleTableRowClick}
                    handleEditUserBtnClick={handleEditUserBtnClick}
                    updateUsersCatering={updateUsersCatering}
                    handleChange={handleChange}
                    updateMealQty={updateMealQty}
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
