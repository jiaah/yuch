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
      {users && users.length === 0 ? (
        <Paper
          component={<h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>}
        />
      ) : (
        <Paper
          isDivided={users.length > 10 && true}
          component={
            <BusinessNoTable
              sortedData={sortedDataA}
              selectedItemValue={selectedItemValue}
              selectedRow={selectedRow}
              handleTableRowClick={handleTableRowClick}
            />
          }
        />
      )}
      {users.length > 10 && (
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
      )}
    </div>
  );
};

export default BusinessNoPaper;
