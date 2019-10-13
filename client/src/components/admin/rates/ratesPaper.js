import React from 'react';
/* --- Components --- */
import { divideInTwoWithSort } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import RatesTable from './ratesTable';

const RatesPaper = ({
  // local state
  users,
  selectedRow,
  // global state
  selectedSearchItem,
  clickedUserData,
  isAdminVerified,
  // funcs
  handleEditUserBtnClick,
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

  const { sortedDataA, sortedDataB } = divideInTwoWithSort(
    users,
    order,
    orderBy,
  );

  return (
    <div className="paper">
      {isAdminVerified ? (
        users && users.length !== 0 ? (
          <React.Fragment>
            <Paper
              isDivided={users.length > 10 && true}
              component={
                <RatesTable
                  order={order}
                  orderBy={orderBy}
                  sortedData={sortedDataA}
                  handleRequestSort={handleRequestSort}
                  selectedRow={selectedRow}
                  clickedUserData={clickedUserData}
                  selectedSearchItem={selectedSearchItem}
                  handleEditUserBtnClick={handleEditUserBtnClick}
                  handleTableRowClick={handleTableRowClick}
                />
              }
            />
            {users.length > 10 && (
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
                    clickedUserData={clickedUserData}
                    selectedSearchItem={selectedSearchItem}
                    handleEditUserBtnClick={handleEditUserBtnClick}
                    handleTableRowClick={handleTableRowClick}
                  />
                }
              />
            )}
          </React.Fragment>
        ) : (
          <Paper
            component={<h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>}
          />
        )
      ) : (
        <Paper
          component={
            <h3 className="mt4 mb4">
              브라우저 새로고침을 하여, 관리자 인증을 해주세요.
            </h3>
          }
        />
      )}
    </div>
  );
};

export default RatesPaper;
