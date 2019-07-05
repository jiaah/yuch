import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHeadwithSortLabel';
import RatesTableRow from './ratesTableRow';
import * as data from '../../../data/data';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { width: '100%' },
});

const RatesTable = ({
  classes: { tableWrapper, table },
  order,
  orderBy,
  sortedData,
  handleRequestSort,
}) => (
  // const emptyRows =
  //   user.length <
  //   15 ?  Math.min(sortedData.length, users.length - page * rowsPerPage);
  <React.Fragment>
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          list={data.cateringRatesTableHeadColumns}
        />
        <TableBody>
          {sortedData.length !== 0 &&
            sortedData.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <RatesTableRow
                  exrTableRow
                  key={row.id}
                  row={row}
                  labelId={labelId}
                />
              );
            })}
          {/* {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
        </TableBody>
      </Table>
    </div>
  </React.Fragment>
);

export default withStyles(styles)(RatesTable);
