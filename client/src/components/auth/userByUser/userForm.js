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
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 460,
    },
  },
  textFieldB: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 125,
    [theme.breakpoints.up('md')]: {
      width: 225,
    },
  },
});

const UserForm = ({
  values: {
    companyName,
    username,
    contactNo,
    email,
    mealPrice,
    lunchQty,
    dinnerQty,
  },
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
  setFieldValue,
  classes,
  openPasswordForm,
}) => {
  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (name === 'lunchQty' || name === 'dinnerQty') {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      }
      if (inputValue === '') {
        value = inputValue;
      }
    }
    if (name === 'username') {
      value = inputValue.toLowerCase();
    }
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <form
      className="flex flex-column-m items-center justify-center"
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
        onChange={e => change(e, 'username', true)}
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
      <div className="flex justify-center">
        <TextField
          id="lunchQty"
          label="중식 식수량"
          placeholder="70"
          value={lunchQty || ''}
          onChange={e => change(e, 'lunchQty', true)}
          onBlur={handleBlur}
          helperText={touched.lunchQty && errors.lunchQty}
          error={touched.lunchQty && Boolean(errors.lunchQty)}
          margin="normal"
          className={classes.textFieldB}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="catering"
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
          id="dinnerQty"
          label="석식 식수량"
          placeholder="35"
          value={dinnerQty || ''}
          onChange={e => change(e, 'dinnerQty', true)}
          onBlur={handleBlur}
          helperText={touched.dinnerQty && errors.dinnerQty}
          error={touched.dinnerQty && Boolean(errors.dinnerQty)}
          margin="normal"
          className={classes.textFieldB}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="catering"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TextField
        id="mealPrice"
        label="식수가격"
        placeholder="5000"
        value={mealPrice || ''}
        InputProps={{
          startAdornment: <InputAdornment position="start">₩</InputAdornment>,
        }}
        margin="normal"
        className={classes.textField}
        disabled={true}
      />
      <div>
        <Button
          typeValue="button"
          variantValue="outlined"
          buttonName="비밀번호 변경"
          width="medium"
          handleButtonClick={openPasswordForm}
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

export default withStyles(styles)(UserForm);
