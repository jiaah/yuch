import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import FlashMessage from './flashMessage';
import { deleteFlashMessage } from '../actions/flashMessageAction';

const FlashMessagesList = ({ variant, message }) => (
  <div>
    {message !== '' && <FlashMessage variant={variant} message={message} />}
  </div>
);

const mapStateToProps = state => ({
  variant: state.flashMessage.variant,
  message: state.flashMessage.message,
});
const mapDispatchToProps = dispatch => ({
  deleteFlashMessage: () => dispatch(deleteFlashMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashMessagesList);
