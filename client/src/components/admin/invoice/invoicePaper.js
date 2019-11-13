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
      {data.length !== 0 ? (
        <React.Fragment>
          <Paper
            isDivided={data.length > 10 && true}
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
          {data.length > 10 && (
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
          )}
        </React.Fragment>
      ) : (
        <Paper component={<h3 className="mt4 mb4">데이터가 없습니다.</h3>} />
      )}
    </div>
  );
};

export default InvoicePaper;
