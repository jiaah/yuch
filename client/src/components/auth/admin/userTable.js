import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { stableSort, getSorting } from '../../../utils/sort';
import UserTableRow from './userTableRow';
import * as data from '../../../shared/data';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 800 },
});

const UserTable = ({
  classes: { tableWrapper, table },
  handleEditUserBtnClick,
  users,
  selectedSearchItem,
}) => {
  // order by 'desc' / 'asc'
  const [order, setOrder] = React.useState('desc');
  // selected column
  const [orderBy, setOrderBy] = React.useState('updated_at');
  // selected row
  const [selected, setSelected] = React.useState('');
  // page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleTableRowClick = id => setSelected(id);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => setRowsPerPage(+event.target.value);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
  const searchUser = users.filter(u => u.companyName === selectedSearchItem);

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            list={data.userAccountTableHeadRows}
          />
          <TableBody>
            {users.length !== 0 &&
              searchUser.length === 0 &&
              stableSort(users, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const bankAccountInfo =
                    row.bankAccountId === 1 ? '김귀자 농협' : '이상환 농협';
                  return (
                    <UserTableRow
                      key={row.id}
                      handleTableRowClick={handleTableRowClick}
                      handleEditUserBtnClick={handleEditUserBtnClick}
                      row={row}
                      bankAccountInfo={bankAccountInfo}
                      selected={selected}
                      labelId={labelId}
                    />
                  );
                })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(UserTable);
