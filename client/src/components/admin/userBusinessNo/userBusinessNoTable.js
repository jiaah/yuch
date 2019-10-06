import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import BusinessNoTableRow from './userBusinessNoTableRow';
import { userBusinessColumns } from '../../../data/data';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
});

const BusinessNoTable = ({
  classes: { tableWrapper, table },
  // local states
  sortedData,
  selectedRow,
  // global states
  selectedItemValue,
  // fncs
  handleTableRowClick,
}) => {
  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="rates" size="small">
          <EnhancedTableHead list={userBusinessColumns} />
          <TableBody>
            {sortedData.length !== 0 &&
              sortedData.map(row => (
                <BusinessNoTableRow
                  key={row.companyName}
                  row={row}
                  selectedItemValue={selectedItemValue}
                  selectedRow={selectedRow}
                  handleTableRowClick={handleTableRowClick}
                />
              ))}
            {emptyRows > 0 && <TableRow style={{ height: 49 * emptyRows }} />}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(BusinessNoTable);
