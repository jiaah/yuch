import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import CustomizedSnackbar from './customizedSnackbar';
import { removeFlashMessage } from '../../actions/messageAction';

const MessagesList = ({ show, variant, message, removeFlashMessage }) => (
  <React.Fragment>
    {show && (
      <CustomizedSnackbar
        show={show}
        variant={variant}
        message={message}
        removeFlashMessage={removeFlashMessage}
      />
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  show: state.message.show,
  variant: state.message.variant,
  message: state.message.message,
});

const mapDispatchToProps = dispatch => ({
  removeFlashMessage: () => dispatch(removeFlashMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesList);
