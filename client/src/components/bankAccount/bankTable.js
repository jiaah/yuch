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
  bankAccount,
  saveClickedItemData,
  deleteBankAccount,
  handleButtonClick,
}) => {
  const [selected, setSelected] = React.useState('');
  const handleTableRowClick = id => setSelected(id);

  const getClickedUserData = async bankId => {
    const bankData = await bankAccount.filter(b => b.id === bankId);
    return bankData[0];
  };

  const handleEditBtnClick = async id => {
    const bankData = await getClickedUserData(id);
    await saveClickedItemData(bankData);
    return handleButtonClick('edit');
  };

  const handleDeleteBtnClick = async id => {
    await deleteBankAccount(id);
    await handleButtonClick('delete');
    // return window.location.reload(true);
  };
  return (
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
  );
};

export default withStyles(styles)(BankTable);
