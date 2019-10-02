import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../shared/tableHead';
import { userInvoiceColumns } from '../../data/data';
import InvoiceTabelRow from './invoiceTableRow';
import Loader from '../loader';

const SpecialMealTableRow = Loader({
  loader: () =>
    import('./specialMealTableRow' /* webpackChunkName: 'BankModal' */),
});

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
  specialColumn: { color: '#023864', paddingLeft: 15 },
  font: { fontWeight: 'bold' },
});

const InvoiceTable = ({
  classes: { tableWrapper, table, specialColumn, font },
  data,
  invoiceFormat,
}) => {
  const { caterings, mealPrice, specialMeals, sumTotal } = data;
  const TAX_RATE = 0.1;

  const ccyFormat = num => `${num.toFixed(2)}`;
  const formatNumber = num =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  const combinedFormat = num => {
    const cyyFormattedNum = ccyFormat(num);
    const formattedNum = formatNumber(cyyFormattedNum);
    return formattedNum;
  };

  const invoiceTaxes = TAX_RATE * sumTotal;
  const invoiceTotal = invoiceTaxes + sumTotal;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="tableTitle">
        <EnhancedTableHead list={userInvoiceColumns} />
        <TableBody data-testid="bank-account--table">
          {caterings.length !== 0 &&
            caterings.map(row => (
              <InvoiceTabelRow
                key={row.date}
                row={row}
                mealPrice={mealPrice}
                formatNumber={formatNumber}
                invoiceFormat={invoiceFormat}
              />
            ))}
          {specialMeals.length !== 0 && (
            <React.Fragment>
              <TableRow>
                <TableCell colSpan={7} align="left" className={specialColumn}>
                  [ 특식 ]
                </TableCell>
              </TableRow>
              {specialMeals.map(row => (
                <SpecialMealTableRow
                  key={row.date}
                  row={row}
                  formatNumber={formatNumber}
                  invoiceFormat={invoiceFormat}
                />
              ))}
            </React.Fragment>
          )}
          <TableRow>
            {/* <TableCell rowSpan={3} /> */}
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{combinedFormat(sumTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0,
            )} %`}</TableCell>
            <TableCell align="right">{combinedFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right" className={font}>
              {combinedFormat(invoiceTotal)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(InvoiceTable);
