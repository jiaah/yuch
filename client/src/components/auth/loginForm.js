import React from 'react';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import Button from '../../shared/formButton';

const Form = props => {
  const {
    values: { username, password },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.username && errors.username}
        error={touched.username && Boolean(errors.username)}
        required={true}
        margin="normal"
        fullWidth
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.password && errors.password}
        error={touched.password && Boolean(errors.password)}
        required={true}
        margin="normal"
        fullWidth
      />
      <Button
        typeValue="submit"
        variantValue="contained"
        buttonName="로그인"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default Form;
