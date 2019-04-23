import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FlashMessage from './flashMessage';

const FlashMessagesList = ({ variant, message }) => (
  <div>
    {message !== '' && <FlashMessage variant={variant} message={message} />}
  </div>
);

const mapStateToProps = state => ({
  variant: state.flashMessage.variant,
  message: state.flashMessage.message,
});

export default connect(
  mapStateToProps,
  null,
)(FlashMessagesList);
