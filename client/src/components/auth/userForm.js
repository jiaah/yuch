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
import Button from '../../shared/button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldB: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 94,
  },
  formControl: {
    float: 'left',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 5,
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
      lunchQuantity,
      dinnerQuantity,
      bankAccountOption,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    handleClose,
    setFieldValue,
    classes,
  } = props;

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (
      name === 'lunchQuantity' ||
      name === 'dinnerQuantity' ||
      name === 'mealPrice'
    ) {
      // avoid isNaN('') === false
      // -> parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      }
      value = inputValue;
    } else {
      value = inputValue;
    }

    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <React.Fragment>
      <h3 className="f-en b"> 신규업체 등록 </h3>
      <form className="mh1 " onSubmit={handleSubmit}>
        <div className="mb2 flex justify-around">
          <div className="flex flex-column-m">
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
          <div className="flex flex-column-m">
            <TextField
              id="password"
              label="비밀번호"
              type="password"
              placeholder="(영문 or 숫자)"
              value={password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              required={true}
              margin="normal"
              className={classes.textField}
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
            />
            <div className="flex ">
              <TextField
                id="lunchQuantity"
                label="중식 식수량"
                placeholder="70"
                value={lunchQuantity || ''}
                onChange={e => change(e, 'lunchQuantity', true)}
                onBlur={handleBlur}
                helperText={touched.lunchQuantity && errors.lunchQuantity}
                error={touched.lunchQuantity && Boolean(errors.lunchQuantity)}
                margin="normal"
                className={classes.textFieldB}
              />
              <TextField
                id="dinnerQuantity"
                label="석식 식수량"
                placeholder="35"
                value={dinnerQuantity || ''}
                onChange={e => change(e, 'dinnerQuantity', true)}
                onBlur={handleBlur}
                helperText={touched.dinnerQuantity && errors.dinnerQuantity}
                error={touched.dinnerQuantity && Boolean(errors.dinnerQuantity)}
                margin="normal"
                className={classes.textFieldB}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <FormControl
            component="fieldset"
            required
            className={`${classes.formControl} flex flex-column-m`}
          >
            <FormLabel component="legend">입금 계좌번호</FormLabel>
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
          <Button
            typeValue="reset"
            variantValue="contained"
            buttonName="닫기"
            width="medium"
            handleButtonClick={ev => handleClose(ev)}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserForm);
