import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import FormButton from '../../../shared/formButton';
import Icon from '../../../../assets/icons';
import * as data from '../../../shared/data';

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
    <form className="mh3 lh-3 mh-auto" onSubmit={handleSubmit}>
      <div className="flex justify-center mb3">
        <Icon
          name="warning"
          width="28"
          height="28"
          viewBox="0 0 25 25"
          fillOuter="#ed4337"
          fillInner="#ffffff"
        />
        <p className="c-red waring-icon--p">
          고객님의 정보가 시스템에서 삭제 됩니다&#46; 삭제된 데이터는 복구할수
          없습니다&#46;
        </p>
      </div>
      <p>
        정말 삭제하시겠습니다?
        <br />
        삭제하시려면&#44;
        <span className="c-point2">
          {data.admin.companyName}
          님의 비밀번호
        </span>
        를 입력해주세요&#46;
      </p>

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

export default withStyles(styles)(DeleteUserForm);
