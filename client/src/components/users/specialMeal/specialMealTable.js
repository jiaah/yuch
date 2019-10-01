import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { clientSpecialMealTableHeadColumns } from '../../../data/data';
import SpecialMealTableRow from './specialMealTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const SpecialMealTable = ({
  classes: { tableWrapper, table },
  data,
  // func
  formatToDateForm,
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
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead list={clientSpecialMealTableHeadColumns} />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            data.map(row => (
              <SpecialMealTableRow
                key={row.id}
                row={row}
                selectedRow={selectedRow}
                formatToDateForm={formatToDateForm}
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

export default withStyles(styles)(SpecialMealTable);
