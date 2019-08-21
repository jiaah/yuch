import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { stableSort, getSorting } from '../../../utils/sort';
import BankTableRow from './bankTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const BankTable = ({
  classes: { tableWrapper, table },
  bankAccountTableHeadColumns,
  bankAccount,
  saveClickedItemData,
  saveSelectedItemValue,
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
    await saveSelectedItemValue(id);
    return handleButtonClick('delete');
  };

  const emptyRows = bankAccount && 7 - bankAccount.length;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead
          order="asc"
          orderBy="id"
          list={bankAccountTableHeadColumns}
        />
        <TableBody>
          {bankAccount &&
            bankAccount.length !== 0 &&
            stableSort(bankAccount, getSorting('asc', 'id')).map(
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
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(BankTable);
