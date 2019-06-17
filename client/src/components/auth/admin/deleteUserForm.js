import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import FormButton from '../../../shared/formButton';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
});

const DeleteUserForm = props => {
  const {
    values: { password },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
  } = props;

  return (
    <form className="mh1" onSubmit={handleSubmit}>
      <p>
        고객님의 정보가 시스템에서 삭제 됩니다. 삭제된 데이터는 복구할수
        없습니다.
      </p>
      <p>정말 삭제하시겠습니다? 삭제하시려면, 비밀번호를 입력해주세요.</p>
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
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="삭제"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default withStyles(styles)(DeleteUserForm);
