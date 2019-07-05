import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import RatesTable from './ratesTable';

const RatesPaper = ({ users }) => {
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
  if (users && users.length <= 5) {
    sortedDataA = users && stableSort(users, getSorting(order, orderBy));
    sortedDataB = [];
  }
  if (users && users.length > 5) {
    const endA =
      users.length % 2 === 0 ? users.length / 2 - 1 : users.length / 2;
    const startB =
      users.length % 2 === 0 ? user.lnegth / 2 : users.length / 2 + 1;
    sortedDataA =
      users && stableSort(users, getSorting(order, orderBy)).slice(0, endA);

    sortedDataB =
      users &&
      stableSort(users, getSorting(order, orderBy)).slice(
        startB,
        users.length - 1,
      );
  }

  console.log('sortedDataA: ', sortedDataA);
  console.log('sortedDataB : ', sortedDataB);

  return (
    <div className="flex">
      <Paper
        classes=""
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
        classes=""
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

export default RatesPaper;
