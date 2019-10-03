import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHeadwithSortLabel';
import { invoiceColumns } from '../../../data/data';
import InvoiceTableRow from './invoiceTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { width: '100%' },
});

const InvoiceTable = ({
  classes: { tableWrapper, table },
  // local states
  order,
  orderBy,
  sortedData,
  selectedRow,
  // global state
  searchedValue,
  // fncs
  handleRequestSort,
  onfocusOnSelectdRow,
}) => {
  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="brief-invoice" size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            list={invoiceColumns}
          />
          <TableBody>
            {sortedData.length !== 0 &&
              sortedData.map(row => (
                <InvoiceTableRow
                  key={row.userId}
                  row={row}
                  selectedRow={selectedRow}
                  searchedValue={searchedValue}
                  onfocusOnSelectdRow={onfocusOnSelectdRow}
                />
              ))}
            {emptyRows > 0 && <TableRow style={{ height: 49 * emptyRows }} />}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(InvoiceTable);
