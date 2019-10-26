import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHeadwithSortLabel';
import { stableSort, getSorting } from '../../../utils/sort';
import UserTableRow from './userTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
});

const UserTable = ({
  classes: { tableWrapper, table },
  userAccountTableHeadColumns,
  // local states
  users,
  selectedRow,
  // global states
  clickedUserData,
  selectedSearchItem,
  // fncs from parent component
  handleEditUserBtnClick,
  handleUserMealPriceBtnClick,
  handleTableRowClick,
}) => {
  // order by 'desc' / 'asc'
  const [order, setOrder] = React.useState('desc');
  // selected column
  const [orderBy, setOrderBy] = React.useState('updated_at');
  // page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => setRowsPerPage(+event.target.value);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  // to render only one user on search.
  const searchUser = users.filter(u => u.companyName === selectedSearchItem);
  const usersToDisplay = searchUser.length === 0 ? users : searchUser;

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="users" size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            list={userAccountTableHeadColumns}
          />
          <TableBody>
            {users &&
              users.length !== 0 &&
              stableSort(usersToDisplay, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <UserTableRow
                    key={row.id}
                    handleTableRowClick={handleTableRowClick}
                    handleEditUserBtnClick={handleEditUserBtnClick}
                    handleUserMealPriceBtnClick={handleUserMealPriceBtnClick}
                    row={row}
                    selectedRow={selectedRow}
                    clickedUserData={clickedUserData}
                  />
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={13} />
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
