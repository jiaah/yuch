import React from 'react';
/* --- Components --- */
import { divideInTow } from '../../../utils/sort';
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
  const { sortedDataA, sortedDataB } = divideInTow(users);

  return (
    <div className="paper">
      {users.length !== 0 && users.length > 10 ? (
        <React.Fragment>
          <Paper
            isDivided={true}
            component={
              <BusinessNoTable
                order={order}
                orderBy={orderBy}
                sortedData={sortedDataA}
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
                sortedData={sortedDataB}
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
              sortedData={sortedDataA}
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
