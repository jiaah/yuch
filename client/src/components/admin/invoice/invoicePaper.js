import React from 'react';
/* --- Components --- */
import { divideInTwoWithSort } from '../../../utils/sort';
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
  const [orderBy, setOrderBy] = React.useState('companyName');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const { sortedDataA, sortedDataB } = divideInTwoWithSort(
    data,
    order,
    orderBy,
  );

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
      ) : null}
    </div>
  );
};

export default InvoicePaper;
