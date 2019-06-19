import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FlashMessage from './flashMessage';

const MessagesList = ({ show, variant, message }) => (
  <React.Fragment>
    {show && <FlashMessage variant={variant} message={message} />}
  </React.Fragment>
);

const mapStateToProps = state => ({
  show: state.message.show,
  variant: state.message.variant,
  message: state.message.message,
});

export default connect(
  mapStateToProps,
  null,
)(MessagesList);
