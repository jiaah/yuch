import React from 'react';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import CateringInputCell from './cateringInputCell';
import CateringTextCell from './cateringTextCell';

const CateringTableRow = ({
  row,
  labelId,
  selectedSearchItem,
  selectedRow,
  editBtnClickedRow,
  handleTableRowClick,
  handleEditUserBtnClick,
}) => (
  <React.Fragment>
    <TableRow
      key={row.userId}
      hover
      role="checkbox"
      tabIndex={-1}
      aria-checked={selectedRow === row.userId}
      selected={
        selectedSearchItem === row.companyName || selectedRow === row.userId
      }
      onClick={() => handleTableRowClick(row.userId)}
    >
      {editBtnClickedRow !== row.userId ? (
        <CateringTextCell
          row={row}
          labelId={labelId}
          handleEditUserBtnClick={handleEditUserBtnClick}
        />
      ) : (
        <CateringInputCell row={row} labelId={labelId} />
      )}
    </TableRow>
  </React.Fragment>
);

export default CateringTableRow;
