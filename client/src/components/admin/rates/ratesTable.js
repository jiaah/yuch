import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
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
  // local states
  order,
  orderBy,
  sortedData,
  selectedRow,
  // global states
  selectedItemValue,
  // fncs
  handleRequestSort,
  handleEditUserBtnClick,
  handleTableRowClick,
}) => {
  const emptyRows = sortedData.length <= 10 ? 10 - sortedData.length : 0;

  return (
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
                    key={row.userId}
                    row={row}
                    labelId={labelId}
                    selectedItemValue={selectedItemValue}
                    selectedRow={selectedRow}
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

export default withStyles(styles)(RatesTable);
