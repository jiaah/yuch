import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../../shared/formButton';
import Button from '../../../shared/button';
import Icon from '../../../../assets/icons';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
  },
});

const AdminForm = props => {
  const {
    values: { companyName, username, contactNo, email },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
  } = props;

  return (
    <form
      className="container flex flex-column-m items-center justify-center"
      onSubmit={handleSubmit}
    >
      <TextField
        id="companyName"
        label="고객명"
        placeholder="(한글) 유청"
        value={companyName || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.companyName && errors.companyName}
        error={touched.companyName && Boolean(errors.companyName)}
        required={true}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="filledUser"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="username"
        label="고객 아이디"
        placeholder="(영문) yucheong"
        value={username || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.username && errors.username}
        error={touched.username && Boolean(errors.username)}
        required={true}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="user"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="contactNo"
        label="연락처"
        placeholder="054 - 745 - 0999"
        value={contactNo || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.contactNo && errors.contactNo}
        error={touched.contactNo && Boolean(errors.contactNo)}
        required={true}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="phone"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="email"
        label="이메일"
        placeholder="sleket12@hanmail.net"
        value={email || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.email && errors.email}
        error={touched.email && Boolean(errors.email)}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="email"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <div>
        <Button
          typeValue="button"
          variantValue="outlined"
          buttonName="비밀번호 변경"
          width="medium"
          // handleButtonClick={}
        />
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="저장"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default withStyles(styles)(AdminForm);
