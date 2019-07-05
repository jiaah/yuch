import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../../shared/formButton';
import Button from '../../../shared/button';
import IconButton from '../../../shared/iconButton';
import Icon from '../../../../assets/icons';
import IconMessage from '../../../shared/iconMessage';
import BankAccountForm from './bankAccountForm';

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
});

const EditUserForm = ({
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
  bankAccount,
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
  setFieldValue,
  classes,
  showSubModal,
}) => {
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
    }
    if (name === 'companyName' || name === 'username') {
      value = inputValue.toLowerCase();
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
            onChange={e => change(e, 'companyName', true)}
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
      <BankAccountForm
        bankAccountId={bankAccountId}
        bankAccount={bankAccount}
        change={change}
      />
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
            <IconMessage
              name="warning"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fillOuter="#ed4337"
              fillInner="#ffffff"
              text="고객에 관한 모든 정보가 삭제됩니다."
              classes="icon-message--warning edit-userform--bottom-delete-message--p"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default withStyles(styles)(EditUserForm);
