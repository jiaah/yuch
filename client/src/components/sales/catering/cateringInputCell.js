import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { Formik } from 'formik';
/* --- Components --- */
import IconFormButton from '../../../shared/form/iconFormButton';
import IconButton from '../../../shared/form/iconButton';
import FormikField from '../../../shared/form/formikField';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const CateringInputCell = ({ classes: { resize }, row, labelId }) => {
  const saveUserCateringChange = () => console.log('saveUserCateringChange ');

  return (
    <Formik
      initialValues={row}
      onSubmit={saveUserCateringChange}
      // validationSchema={}
      render={props => (
        <React.Fragment>
          <TableCell padding="checkbox">
            <IconFormButton
              name="done"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              isSubmitting={props.isSubmitting}
              handleClick={e => console.log('save')}
            />
          </TableCell>
          <TableCell padding="checkbox">
            <div className="table-btn--close">
              <IconButton
                name="close"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                handleClick={e => console.log('close')}
              />
            </div>
          </TableCell>
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
            <FormikField name="lunchQty" type="text" styleName="textFieldE" />
          </TableCell>
          <TableCell align="right" className={resize}>
            <FormikField name="dinnerQty" type="text" styleName="textFieldE" />
          </TableCell>
          <TableCell align="right" className={resize}>
            <FormikField
              name="lateNightSnackQty"
              type="text"
              styleName="textFieldE"
            />
          </TableCell>
        </React.Fragment>
      )}
    />
  );
};

export default withStyles(styles)(CateringInputCell);
