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
import FormButton from '../../../shared/formButton';
import Button from '../../../shared/button';
import IconButton from '../../../shared/iconButton';
import Icon from '../../../../assets/icons';

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

const EditUserForm = props => {
  const {
    values: {
      companyName,
      username,
      contactNo,
      email,
      mealPrice,
      lunchQty,
      dinnerQty,
      bankAccountId,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    setFieldValue,
    classes,
    showSubModal,
  } = props;

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (name === 'lunchQty' || name === 'dinnerQty' || name === 'mealPrice') {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
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
    <form className="mh1" onSubmit={handleSubmit}>
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
            id="contactNo"
            label="연락처"
            placeholder="054 - 745 - 0999"
            value={contactNo || ''}
            onChange={e => change(e, 'contactNo', true)}
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
        </div>
        <div className="user-form--right">
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
        </div>
      </div>
      <div className="user-form--bankaccount">
        <FormControl
          component="fieldset"
          required
          className={`${classes.formControl} flex flex-column-m`}
        >
          <div className="flex">
            <Icon
              name="bankAccount"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            />
            <FormLabel component="legend" className={classes.formLabel}>
              입금 계좌번호
            </FormLabel>
          </div>
          <RadioGroup
            aria-label="bankAccountId"
            name="bankAccountId"
            value={bankAccountId}
            onChange={e => change(e, 'bankAccountId', false)}
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
      <div className="edit-userform--bottom">
        <div>
          <Button
            typeValue="button"
            variantValue="outlined"
            buttonName="비밀번호 변경"
            width="medium"
            handleButtonClick={() => showSubModal('password')}
          />
          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="저장"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="edit-userform--bottom-delete">
          <div className="edit-userform--bottom-delete-icon">
            <IconButton
              name="delete"
              width="33"
              height="33"
              viewBox="0 0 24 24"
              handleClick={() => showSubModal('delete')}
            />
          </div>
          <div className="flex edit-userform--bottom-delete-message">
            <Icon
              name="warning"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fillOuter="#ed4337"
              fillInner="#ffffff"
            />
            <React.Fragment>
              <p className="c-red edit-userform--bottom-delete-message--p">
                고객에 관한 모든 정보가 삭제됩니다.
              </p>
            </React.Fragment>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withStyles(styles)(EditUserForm);
