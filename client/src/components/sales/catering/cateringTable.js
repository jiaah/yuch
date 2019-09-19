import React from 'react';
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
  table: { width: '100%' },
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
}) => {
  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  // to render only one user on search.
  const searchUser = sortedData.filter(
    u => u.companyName === selectedSearchItem,
  );
  const userToDisplay = searchUser.length === 0 ? sortedData : searchUser;

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
              userToDisplay.map((row, index) => {
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
