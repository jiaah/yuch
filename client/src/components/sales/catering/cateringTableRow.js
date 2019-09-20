import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { TextField } from '@material-ui/core';
import IconButton from '../../../shared/form/iconButton';
import IconFormButton from '../../../shared/form/iconFormButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
  textField: { width: 60 },
});

const CateringTableRow = ({
  classes: { resize, textField },
  row,
  labelId,
  selectedSearchItem,
  selectedRow,
  // editBtnClickedRow,
  // handleTableRowClick,
  handleEditUserBtnClick,
  handleChange,
  updateMealQty,
}) => {
  const { userId, companyName, lunchQty, dinnerQty, lateNightSnackQty } = row;
  const [editIndex, setEditIndex] = useState('');
  const startEditing = id => setEditIndex(id);
  const endEditing = () => setEditIndex('');

  const currentlyEditing = editIndex === userId;

  return (
    <React.Fragment>
      <TableRow
        key={`tr-${userId}`}
        hover
        role="checkbox"
        tabIndex={-1}
        aria-checked={selectedRow === userId}
        selected={selectedSearchItem === companyName || selectedRow === userId}
        // onClick={() => handleTableRowClick(row.userId)}
      >
        {currentlyEditing ? (
          <React.Fragment>
            <TableCell padding="checkbox">
              <IconFormButton
                name="done"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                // isSubmitting={isSubmitting}
                handleClick={() => updateMealQty(userId)}
              />
            </TableCell>
            <TableCell padding="checkbox">
              <div className="table-btn--close">
                <IconButton
                  name="close"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  handleClick={endEditing}
                />
              </div>
            </TableCell>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TableCell padding="checkbox">
              <div className="table-btn--edit">
                <IconButton
                  name="edit"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  handleClick={e => {
                    handleEditUserBtnClick(e, userId);
                    startEditing(userId);
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              className={resize}
            />
          </React.Fragment>
        )}
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          className={resize}
        >
          {companyName}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lunchQty"
              onChange={e => handleChange(e, 'lunchQty', userId)}
              value={lunchQty}
              className={textField}
            />
          ) : (
            `${lunchQty}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="dinnerQty"
              onChange={e => handleChange(e, 'dinnerQty', userId)}
              value={dinnerQty}
              className={textField}
            />
          ) : (
            `${lunchQty}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lateNightSnackQty"
              onChange={e => handleChange(e, 'lateNightSnackQty', userId)}
              value={lateNightSnackQty}
              className={textField}
            />
          ) : (
            `${lunchQty}`
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(CateringTableRow);
