import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import RatesTable from './ratesTable';

const RatesPaper = ({ users, selectedSearchItem, handleEditUserBtnClick }) => {
  // order by 'desc' / 'asc'
  const [order, setOrder] = React.useState('desc');
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
    <div className="paper--rates">
      <Paper
        classes="r--w-20"
        component={
          <RatesTable
            users={users}
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataA}
            handleRequestSort={handleRequestSort}
            selectedSearchItem={selectedSearchItem}
            handleEditUserBtnClick={handleEditUserBtnClick}
          />
        }
      />
      <Paper
        classes="r--w-20 paper-sec--rates"
        component={
          <RatesTable
            users={users}
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataB}
            handleRequestSort={handleRequestSort}
            selectedSearchItem={selectedSearchItem}
            handleEditUserBtnClick={handleEditUserBtnClick}
          />
        }
      />
    </div>
  );
};

export default RatesPaper;
