import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const CateringTextCell = ({
  classes: { resize },
  row,
  labelId,
  handleEditUserBtnClick,
}) => (
  <React.Fragment>
    <TableCell padding="checkbox">
      <div className="table-btn--edit">
        <IconButton
          name="edit"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          handleClick={e => handleEditUserBtnClick(e, row.userId)}
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
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      padding="none"
      className={resize}
    >
      {row.companyName}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.lunchQty}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.dinnerQty}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.lateNightSnackQty}
    </TableCell>
  </React.Fragment>
);

export default withStyles(styles)(CateringTextCell);
