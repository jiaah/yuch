import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
/* --- Components --- */
import SnackbarContentWrapper from './snackbarContentWrapper';

const CustomizedSnackbar = ({ show, variant, message, removeFlashMessage }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeFlashMessage();
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContentWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};
export default CustomizedSnackbar;
