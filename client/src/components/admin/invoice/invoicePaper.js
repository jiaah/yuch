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
    <div className="paper">
      {data.length !== 0 && data.length > 10 ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : data.length !== 0 && data.length <= 10 ? (
        <Paper
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
      ) : (
        <Paper
          component={
            <h3 className="mt4 mb4">발행된 거래 명세서가 없습니다.</h3>
          }
        />
      )}
    </div>
  );
};

export default InvoicePaper;
