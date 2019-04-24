import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../shared/formButton';
import Icon from '../../../assets/icons';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  textFieldB: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 118,
  },
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  formLabel: {
    marginLeft: '8px',
  },
  formControlLabel: {
    [theme.breakpoints.up('md')]: {
      marginRight: '50px',
    },
  },
});

const UserForm = props => {
  const {
    values: {
      companyName,
      username,
      password,
      confirmPassword,
      contactNumber,
      email,
      mealPrice,
      lunchQuantityValue,
      dinnerQuantityValue,
      bankAccountOption,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    setFieldValue,
    classes,
  } = props;

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (
      name === 'lunchQuantityValue' ||
      name === 'dinnerQuantityValue' ||
      name === 'mealPrice'
    ) {
      // avoid isNaN('') === false
      // -> parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      } else {
        value = inputValue;
      }
    } else {
      value = inputValue;
    }

    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <React.Fragment>
      <form className="mh1 " onSubmit={handleSubmit}>
        <div className="mb2 user-form">
          <div className="user-form--left">
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
              id="contactNumber"
              label="연락처"
              placeholder="054 - 745 - 0999"
              value={contactNumber || ''}
              onChange={e => change(e, 'contactNumber', true)}
              onBlur={handleBlur}
              helperText={touched.contactNumber && errors.contactNumber}
              error={touched.contactNumber && Boolean(errors.contactNumber)}
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
              id="mealPrice"
              label="식수가격"
              placeholder="5000"
              value={mealPrice || ''}
              onChange={e => change(e, 'mealPrice', true)}
              onBlur={handleBlur}
              helperText={touched.mealPrice && errors.mealPrice}
              error={touched.mealPrice && Boolean(errors.mealPrice)}
              required={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₩</InputAdornment>
                ),
              }}
              margin="normal"
              className={classes.textField}
            />
          </div>
          <div className="user-form--right">
            <TextField
              id="password"
              label="비밀번호"
              type="password"
              placeholder="(영문, 숫자 포함)"
              value={password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              required={true}
              margin="normal"
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      name="lock"
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
              id="confirmPassword"
              label="비밀번호 확인"
              type="password"
              value={confirmPassword || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              required={true}
              margin="normal"
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      name="lock"
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
                id="lunchQuantityValue"
                label="중식 식수량"
                placeholder="70"
                value={lunchQuantityValue || ''}
                onChange={e => change(e, 'lunchQuantityValue', true)}
                onBlur={handleBlur}
                helperText={
                  touched.lunchQuantityValue && errors.lunchQuantityValue
                }
                error={
                  touched.lunchQuantityValue &&
                  Boolean(errors.lunchQuantityValue)
                }
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
                id="dinnerQuantityValue"
                label="석식 식수량"
                placeholder="35"
                value={dinnerQuantityValue || ''}
                onChange={e => change(e, 'dinnerQuantityValue', true)}
                onBlur={handleBlur}
                helperText={
                  touched.dinnerQuantityValue && errors.dinnerQuantityValue
                }
                error={
                  touched.dinnerQuantityValue &&
                  Boolean(errors.dinnerQuantityValue)
                }
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
          </div>
        </div>
        <div>
          <FormControl
            component="fieldset"
            required
            className={`${classes.formControl} flex flex-column-m`}
          >
            <div className="flex">
              <Icon
                name="bankAccount"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
              <FormLabel component="legend" className={classes.formLabel}>
                입금 계좌번호
              </FormLabel>
            </div>
            <RadioGroup
              aria-label="bankAccountOption"
              name="bankAccountOption"
              value={bankAccountOption}
              onChange={e => change(e, 'bankAccountOption', false)}
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="김귀자&#8201;&#8201;&#8201;농협&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;7210xx-xx-xxxxxx"
                labelPlacement="end"
                className={classes.formControlLabel}
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="이상환&#8201;&#8201;&#8201;농협&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;7211xx-xx-xxxxxx"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="justify-center">
          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="저장"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserForm);
