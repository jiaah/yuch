import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { revenueColumns } from '../../../data/data';
import RevenueTableRow from './revenueTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const RevenueTable = ({
  classes: { tableWrapper, table },
  data,
  // func
  revenueFormat,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  useEffect(
    () => () => {
      offFocusOnSelectdRow();
    },
    [],
  );

  const emptyRows = data && 3 - data.length;

  return (
    <div id="print" className={tableWrapper}>
      <Table className={table} aria-labelledby="revenue">
        <EnhancedTableHead list={revenueColumns} />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            data.map(row => (
              <RevenueTableRow
                key={row.date}
                row={row}
                revenueFormat={revenueFormat}
                selectedRow={selectedRow}
                onfocusOnSelectdRow={onfocusOnSelectdRow}
              />
            ))}
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={10} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(RevenueTable);
