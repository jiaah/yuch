import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../shared/tableHead';
import { stableSort, getSorting } from '../../utils/sort';
import BankTableRow from './bankTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 800 },
});

const BankTable = ({
  classes: { tableWrapper, table },
  bankAccountTableHeadRows,
  handleEditBtnClick,
  handleDeleteBtnClick,
  bankAccount,
}) => {
  const [selected, setSelected] = React.useState('');
  const handleTableRowClick = id => setSelected(id);
  return (
    <React.Fragment>
      <div className={tableWrapper}>
        <Table className={table} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order="desc"
            orderBy="accountHolder"
            list={bankAccountTableHeadRows}
          />
          <TableBody>
            {bankAccount &&
              bankAccount.length !== 0 &&
              stableSort(bankAccount, getSorting('desc', 'accountHolder')).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <BankTableRow
                      key={row.id}
                      handleTableRowClick={handleTableRowClick}
                      handleEditBtnClick={handleEditBtnClick}
                      handleDeleteBtnClick={handleDeleteBtnClick}
                      row={row}
                      selected={selected}
                      labelId={labelId}
                    />
                  );
                },
              )}
            <TableRow style={{ height: 49 * 5 }}>
              <TableCell colSpan={6} />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(BankTable);
