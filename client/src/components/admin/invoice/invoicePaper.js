import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import RatesTable from './invoiceTable';

const InvoicePaper = ({
  // local state
  data,
}) => {
  const [order, setOrder] = React.useState('asc');
  // selected column
  const [orderBy, setOrderBy] = React.useState('companyName');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  let sortedDataA;
  let sortedDataB;
  if (data && data.length <= 10) {
    sortedDataA = stableSort(data, getSorting(order, orderBy));
    sortedDataB = [];
  }
  if (data && data.length > 10) {
    const line =
      data.length % 2 === 0 ? data.length / 2 : data.length / 2 + 0.5;
    sortedDataA = stableSort(data, getSorting(order, orderBy)).slice(0, line);
    sortedDataB = stableSort(data, getSorting(order, orderBy)).slice(
      line,
      data.length,
    );
  }

  return (
    <div id="print" className="paper">
      <Paper
        component={
          <RatesTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataA}
            handleRequestSort={handleRequestSort}
          />
        }
      />
      <Paper
        classes="paper--sec"
        component={
          <RatesTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataB}
            handleRequestSort={handleRequestSort}
          />
        }
      />
    </div>
  );
};

export default InvoicePaper;
