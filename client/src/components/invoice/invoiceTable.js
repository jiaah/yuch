import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../shared/tableHead';
import { userInvoiceColumnsWithLateNightSnack, userInvoiceColumnsWithBreakfast } from '../../data/data';
import InvoiceTabelRow from './invoiceTableRow';
// import Loader from '../loader';
import { formatNumber, combinedFormat } from '../../utils/reformat';

// const SpecialMealTableRow = Loader({
//   loader: () =>
//     import('./specialMealTableRow' /* webpackChunkName: 'BankModal' */),
// });

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
  // specialColumn: { color: '#023864', paddingLeft: 35 },
  font: { fontWeight: 'bold' },
});

const InvoiceTable = ({
  classes: { tableWrapper, table, font },
  data,
  invoiceFormat,
  mealType,
}) => {
  const { caterings, mealPrice, sumTotal } = data;
  const TAX_RATE = 0.1;

  const invoiceTaxes = TAX_RATE * sumTotal;
  const invoiceTotal = invoiceTaxes + sumTotal;

  const formattedSubTotal = combinedFormat(sumTotal);
  const formattedTax = `${(TAX_RATE * 100).toFixed(0)} %`;
  const formattedInvoiceTaxes = combinedFormat(invoiceTaxes);
  const formattedInvoiceTotal = combinedFormat(invoiceTotal);

  // 식수량 합
  const calTotal = (acc, cur) => acc + cur;
  const lunchTotal = caterings.map(i => i.lunchQty).reduce(calTotal);
  const dinnerTotal = caterings.map(i => i.dinnerQty).reduce(calTotal);
  const lateNightSnackTotal = caterings
    .map(i => i.lateNightSnackQty)
    .reduce(calTotal);
  const totalQty = lunchTotal + dinnerTotal + lateNightSnackTotal;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="invoice" size="small">
        <EnhancedTableHead list={mealType === '야식' ? userInvoiceColumnsWithLateNightSnack : userInvoiceColumnsWithBreakfast} />
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
          {/* {specialMeals.length !== 0 && (
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
          )} */}
          <TableRow>
            <TableCell align="right">식수량 합계</TableCell>
            <TableCell align="right">{lunchTotal}</TableCell>
            <TableCell align="right">{dinnerTotal}</TableCell>
            <TableCell align="right">{lateNightSnackTotal}</TableCell>
            <TableCell align="right" colSpan={2}>
              {totalQty}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{formattedSubTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{formattedTax}</TableCell>
            <TableCell align="right">{formattedInvoiceTaxes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right" className={font}>
              {formattedInvoiceTotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(InvoiceTable);
