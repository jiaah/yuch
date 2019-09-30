import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import RatesTable from './invoiceTable';

const InvoicePaper = ({
  // local state
  data,
  selectedRow,
  // global state
  searchedValue,
  // func
  onfocusOnSelectdRow,
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
        isDivided={true}
        component={
          <RatesTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataA}
            handleRequestSort={handleRequestSort}
            selectedRow={selectedRow}
            searchedValue={searchedValue}
            onfocusOnSelectdRow={onfocusOnSelectdRow}
          />
        }
      />
      <Paper
        isDivided={true}
        classname="paper--sec"
        component={
          <RatesTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataB}
            handleRequestSort={handleRequestSort}
            selectedRow={selectedRow}
            searchedValue={searchedValue}
            onfocusOnSelectdRow={onfocusOnSelectdRow}
          />
        }
      />
    </div>
  );
};

export default InvoicePaper;
