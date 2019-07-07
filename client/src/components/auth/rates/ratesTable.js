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
  users,
  order,
  orderBy,
  sortedData,
  handleRequestSort,
  selectedSearchItem,
  handleEditUserBtnClick,
}) => {
  const emptyRows = users.length <= 10 ? 10 - users.length : 0;
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
                    exrTableRow
                    key={row.id}
                    row={row}
                    labelId={labelId}
                    selectedSearchItem={selectedSearchItem}
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
