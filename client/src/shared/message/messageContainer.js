import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
/* --- Components --- */
import CustomizedSnackbar from './customizedSnackbar';
import { removeFlashMessage } from '../../actions/messageAction';
import { userLogout } from '../../actions/authAction';

const MessagesList = ({
  show,
  variant,
  message,
  httpStatus,
  id,
  userLogout,
  removeFlashMessage,
  history,
}) => {
  const [msg, setMsg] = useState('');

  const messageHandler = async () => {
    // token error
    if (httpStatus === 401) {
      setMsg('고객님의 인증에 실패하였습니다. 다시 로그인 해주세요.');
      await userLogout(id);
      return history.push('/login');
    }
    return setMsg(message);
  };

  useEffect(() => {
    messageHandler();
  }, []);

  return (
    <React.Fragment>
      {show &&
        msg !== '' && (
          <CustomizedSnackbar
            show={show}
            variant={variant}
            message={msg}
            removeFlashMessage={removeFlashMessage}
          />
        )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  show: state.message.show,
  variant: state.message.variant,
  message: state.message.message,
  httpStatus: state.httpHandler.status,
  id: state.auth.id,
});

const mapDispatchToProps = dispatch => ({
  removeFlashMessage: () => dispatch(removeFlashMessage()),
  userLogout: id => dispatch(userLogout(id)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MessagesList),
);
