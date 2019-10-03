import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import { stableSort, getSorting } from '../../../utils/sort';
import EmployeeTableRow from './TableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const EmployeeTable = ({
  classes: { tableWrapper, table },
  bankAccountTableHeadColumns,
  data,
  saveClickedItemData,
  saveSelectedItemValue,
  handleButtonClick,
}) => {
  const [selected, setSelected] = React.useState('');
  const handleTableRowClick = id => setSelected(id);

  const getClickedUserData = async bankId => {
    const bankData = await data.filter(b => b.id === bankId);
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

  const emptyRows = data && 7 - data.length;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="bank" size="small">
        <EnhancedTableHead list={bankAccountTableHeadColumns} />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            stableSort(data, getSorting('asc', 'id')).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <EmployeeTableRow
                  key={row.id}
                  handleTableRowClick={handleTableRowClick}
                  handleEditBtnClick={handleEditBtnClick}
                  handleDeleteBtnClick={handleDeleteBtnClick}
                  row={row}
                  selected={selected}
                  labelId={labelId}
                />
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(EmployeeTable);