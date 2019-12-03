import React, { useRef } from 'react';
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
  point: { fontWeight: 'bold' },
  textField: { width: 60 },
});

const CateringTableRow = ({
  classes: { resize, textField, point },
  // var
  row,
  // global state
  selectedItemValue,
  // local state
  inputs,
  editIndex,
  isSubmitting,
  selectedRow,
  lunchQtyErr,
  dinnerQtyErr,
  lateNightSnackQtyErr,
  // funcs
  handleChange,
  updateMealQty,
  startEditing,
  endEditing,
  handleTableRowClick,
  // actions
  saveSelectedItemValue,
  resetSelectedItemValue,
}) => {
  // create input refs
  const inputRefs = inputs && useRef(inputs.map(() => React.createRef()));
  // move focus to next input ref
  const handleKeyPress = (e, id) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (id === inputs.length - 1) {
        return updateMealQty(userId);
      }
      return inputRefs.current[id].current.focus();
    }
  };

  const { userId, companyName, lunchQty, dinnerQty, lateNightSnackQty } = row;
  const currentlyEditing = editIndex === userId;

  const lunch = lunchQty === null ? '' : lunchQty;
  const dinner = dinnerQty === null ? '' : dinnerQty;
  const lateNightSnack = lateNightSnackQty === null ? '' : lateNightSnackQty;

  // blur the rest on edit
  const isOff =
    !editIndex || !selectedItemValue
      ? null
      : selectedItemValue !== userId
        ? 'off'
        : null;

  const handleEditBtnClick = async (e, id) => {
    e.preventDefault();
    // to keep edited row in focus
    await saveSelectedItemValue(id);
    return startEditing(id);
  };

  const handleCloseBtnClick = async () => {
    endEditing();
    resetSelectedItemValue();
  };

  return (
    <React.Fragment>
      <TableRow
        key={`tr-${userId}`}
        // selected row on search
        selected={
          // companyName -> searched row in focus
          // userId -> edited row in focus
          selectedItemValue === companyName ||
          selectedItemValue === userId ||
          selectedRow === userId
        }
        className={isOff}
        onClick={e => handleTableRowClick(e, userId)}
      >
        {currentlyEditing ? (
          <React.Fragment>
            <TableCell padding="checkbox">
              <IconFormButton
                name="done"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                isSubmitting={isSubmitting}
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
                  handleClick={handleCloseBtnClick}
                />
              </div>
            </TableCell>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TableCell padding="checkbox">
              <IconButton
                name="edit"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                handleClick={e => handleEditBtnClick(e, userId)}
              />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              padding="none"
              className={resize}
            />
          </React.Fragment>
        )}
        <TableCell
          component="th"
          id={userId}
          scope="row"
          padding="none"
          className={`${resize} ${point} catering-admin`}
        >
          {companyName}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lunchQty"
              type="number"
              onChange={e => handleChange(e, 'lunchQty', userId)}
              value={lunch}
              className={textField}
              error={lunchQtyErr}
              inputRef={inputRefs.current[0]}
              onKeyDown={e => handleKeyPress(e, 1)}
            />
          ) : (
            `${lunch}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="dinnerQty"
              type="number"
              onChange={e => handleChange(e, 'dinnerQty', userId)}
              value={dinner}
              className={textField}
              error={dinnerQtyErr}
              inputRef={inputRefs.current[1]}
              onKeyDown={e => handleKeyPress(e, 2)}
            />
          ) : (
            `${dinner}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lateNightSnackQty"
              type="number"
              onChange={e => handleChange(e, 'lateNightSnackQty', userId)}
              value={lateNightSnack}
              className={textField}
              error={lateNightSnackQtyErr}
              inputRef={inputRefs.current[2]}
              onKeyDown={e => handleKeyPress(e, inputs.length - 1)}
            />
          ) : (
            `${lateNightSnack}`
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(CateringTableRow);
