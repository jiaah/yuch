import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import FormButton from '../form/formButton';
import ConfirmMessage from './confirmMessage';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
});

const AdminConfirmForm = props => {
  const {
    values: { password },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
    confirmType,
  } = props;

  return (
    <form className="mh3 lh-3 mh-auto" onSubmit={handleSubmit}>
      <ConfirmMessage type={confirmType} />
      <div className="flex justify-center mt4">
        <TextField
          id="password"
          label="비밀번호"
          value={password || ''}
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="유청님의 비밀번호를 입력해주세요."
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
          required={true}
          margin="normal"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="ml3 mt2">
          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="삭제"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
};

export default withStyles(styles)(AdminConfirmForm);
