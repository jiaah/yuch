import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from './enhancedTableHead';
import { stableSort, getSorting } from '../../../utils/sort';
import Icon from '../../../../assets/icons';

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

const createData = (
  companyName,
  username,
  contactNumber,
  email,
  mealPrice,
  lunchQuantity,
  dinnerQuantity,
  bankAccount,
) => ({
  companyName,
  username,
  contactNumber,
  email,
  mealPrice,
  lunchQuantity,
  dinnerQuantity,
  bankAccount,
});

const rows = [
  createData('Honeycomb', 408, 3.2, 87, 6.5, 408, 3.2, 87),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 408, 3.2, 87),
  createData('Jelly Bean', 375, 0.0, 94, 0.0, 408, 3.2, 87),
  createData('KitKat', 518, 26.0, 65, 7.0, 408, 3.2, 87),
  createData('Lollipop', 392, 0.2, 98, 0.0, 408, 3.2, 87),
  createData('Marshmallow', 318, 0, 81, 2.0, 408, 3.2, 87),
  createData('Nougart', 360, 19.0, 9, 37.0, 408, 3.2, 87),
  createData('Orefo', 4337, 18.0, 63, 4.0, 408, 3.2, 87),
  createData('Honevycomb', 4068, 3.2, 87, 6.5, 408, 3.2, 87),
  createData('Ice crfeam sandwich', 2327, 9.0, 37, 4.3, 408, 3.2, 87),
  createData('Jelly rBean', 3755, 0.0, 94, 0.0, 408, 3.2, 87),
  createData('KitKaft', 5138, 26.0, 65, 7.0, 408, 3.2, 87),
  createData('Lollipoxp', 3922, 0.2, 98, 0.0, 408, 3.2, 87),
  createData('Marshmcallow', 3148, 0, 81, 2.0, 408, 3.2, 87),
  createData('Nouegat', 3603, 19.0, 9, 37.0, 408, 3.2, 87),
  createData('Oreod', 4374, 18.0, 63, 4.0, 408, 3.2, 87),
];

const UserTable = ({
  classes: { tableWrapper, table, resize },
  handleEditBtnClick,
}) => {
  // Table columns
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('companyName');
  // Table rows
  const [selected, setSelected] = React.useState('');
  // Pages
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
                      <div onClick={e => handleEditBtnClick(e, row.username)}>
                        <Icon
                          name="edit"
                          width="18"
                          height="18"
                          viewBox="0 0 25 25"
                          fill="none"
                        />
                      </div>
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
                      {row.contactNumber}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.email}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.mealPrice}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.lunchQuantity}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.dinnerQuantity}
                    </TableCell>
                    <TableCell align="right" className={resize}>
                      {row.bankAccount}
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
