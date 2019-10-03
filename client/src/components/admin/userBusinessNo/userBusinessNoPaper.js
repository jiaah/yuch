import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import BusinessNoTable from './userBusinessNoTable';

const BusinessNoPaper = ({
  // local state
  users,
  selectedRow,
  // global state
  selectedItemValue,
  // funcs
  handleTableRowClick,
}) => {
  // order by 'desc' / 'asc'
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
  if (users && users.length <= 10) {
    sortedDataA = stableSort(users, getSorting(order, orderBy));
    sortedDataB = [];
  }
  if (users && users.length > 10) {
    const line =
      users.length % 2 === 0 ? users.length / 2 : users.length / 2 + 0.5;
    sortedDataA = stableSort(users, getSorting(order, orderBy)).slice(0, line);
    sortedDataB = stableSort(users, getSorting(order, orderBy)).slice(
      line,
      users.length,
    );
  }

  return (
    <div id="print" className="paper">
      {users.length !== 0 && users.length > 10 ? (
        <React.Fragment>
          <Paper
            isDivided={true}
            component={
              <BusinessNoTable
                order={order}
                orderBy={orderBy}
                sortedData={sortedDataA}
                handleRequestSort={handleRequestSort}
                selectedItemValue={selectedItemValue}
                selectedRow={selectedRow}
                handleTableRowClick={handleTableRowClick}
              />
            }
          />
          <Paper
            isDivided={true}
            classname="paper--sec"
            component={
              <BusinessNoTable
                order={order}
                orderBy={orderBy}
                sortedData={sortedDataB}
                handleRequestSort={handleRequestSort}
                selectedItemValue={selectedItemValue}
                selectedRow={selectedRow}
                handleTableRowClick={handleTableRowClick}
              />
            }
          />
        </React.Fragment>
      ) : users.length !== 0 && users.length <= 10 ? (
        <Paper
          component={
            <BusinessNoTable
              order={order}
              orderBy={orderBy}
              sortedData={sortedDataA}
              handleRequestSort={handleRequestSort}
              selectedItemValue={selectedItemValue}
              selectedRow={selectedRow}
              handleTableRowClick={handleTableRowClick}
            />
          }
        />
      ) : (
        <Paper
          component={<h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>}
        />
      )}
    </div>
  );
};

export default BusinessNoPaper;
