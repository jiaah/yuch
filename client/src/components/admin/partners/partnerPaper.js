import React from 'react';
/* --- Components --- */
import { divideInTow } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import PartnerTable from './partnerTable';

const PartnerPaper = ({
  partnerColumns,
  // local state
  data,
  selectedRow,
  // global state
  clickedUserData,
  selectedSearchItem,
  // actions
  saveClickedItemData,
  saveSelectedItemValue,
  // funcs
  handleTableRowClick,
  handleButtonClick,
}) => {
  const { sortedDataA, sortedDataB } = divideInTow(data);

  return (
    <div className="paper">
      {data && data.length === 0 ? (
        <Paper
          component={<h3 className="mt4 mb4">등록된 거래처가 없습니다.</h3>}
        />
      ) : (
        <Paper
          isDivided={data.length > 10 && true}
          component={
            <PartnerTable
              sortedData={sortedDataA}
              selectedRow={selectedRow}
              selectedSearchItem={selectedSearchItem}
              saveClickedItemData={saveClickedItemData}
              saveSelectedItemValue={saveSelectedItemValue}
              handleButtonClick={handleButtonClick}
              handleTableRowClick={handleTableRowClick}
              partnerColumns={partnerColumns}
              clickedUserData={clickedUserData[0] || clickedUserData}
            />
          }
        />
      )}
      {data.length > 10 && (
        <Paper
          isDivided={true}
          classname="paper--sec"
          component={
            <PartnerTable
              sortedData={sortedDataB}
              selectedRow={selectedRow}
              selectedSearchItem={selectedSearchItem}
              saveClickedItemData={saveClickedItemData}
              saveSelectedItemValue={saveSelectedItemValue}
              handleButtonClick={handleButtonClick}
              handleTableRowClick={handleTableRowClick}
              partnerColumns={partnerColumns}
              clickedUserData={clickedUserData[0] || clickedUserData}
            />
          }
        />
      )}
    </div>
  );
};

export default PartnerPaper;
