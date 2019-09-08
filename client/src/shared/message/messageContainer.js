import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
/* --- Components --- */
import CustomizedSnackbar from './customizedSnackbar';
import { removeFlashMessage } from '../../actions/messageAction';

const MessagesList = ({
  show,
  variant,
  message,
  httpStatus,

  removeFlashMessage,
}) => (
  <React.Fragment>
    {show && (
      <CustomizedSnackbar
        show={show}
        variant={variant}
        message={
          httpStatus === 401
            ? '유효하지 않은 토큰입니다. 다시 로그인 해주세요.'
            : message
        }
        removeFlashMessage={removeFlashMessage}
      />
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  show: state.message.show,
  variant: state.message.variant,
  message: state.message.message,
  httpStatus: state.httpHandler.status,
});

const mapDispatchToProps = dispatch => ({
  removeFlashMessage: () => dispatch(removeFlashMessage()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MessagesList),
);
