import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from './userTableHead';
import { stableSort, getSorting } from '../../../utils/sort';
import IconButton from '../../../shared/iconButton';

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 800 },
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const UserTable = ({
  classes: { tableWrapper, table, resize },
  handleEditUserBtnClick,
  rows,
}) => {
  // order by 'desc' / 'asc'
  const [order, setOrder] = React.useState('asc');
  // selected column
  const [orderBy, setOrderBy] = React.useState('company_name');
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

  const handleTableRowClick = username => setSelected(username);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => setRowsPerPage(+event.target.value);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                const bankAccountInfo =
                  row.bankAccountId === 1 ? '김귀자 농협' : '이상환 농협';
                return (
                  <TableRow
                    hover
                    onClick={() => handleTableRowClick(row.username)}
                    role="checkbox"
                    aria-checked={selected === row.username}
                    tabIndex={-1}
                    key={row.username}
                    selected={selected === row.username}
                  >
                    <TableCell padding="checkbox">
                      <IconButton
                        name="edit"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        handleClick={e =>
                          handleEditUserBtnClick(e, row.username)
                        }
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      className={resize}
                    >
                      {row.companyName}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.username}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.contactNo}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.email}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.mealPrice}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.lunchQty}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.dinnerQty}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {bankAccountInfo}
                    </TableCell>
                  </TableRow>
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
        count={rows.length}
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
