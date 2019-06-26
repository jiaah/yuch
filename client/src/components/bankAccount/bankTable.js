import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
  handleEditBankBtnClick,
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
                      handleEditBankBtnClick={handleEditBankBtnClick}
                      row={row}
                      selected={selected}
                      labelId={labelId}
                    />
                  );
                },
              )}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(BankTable);
