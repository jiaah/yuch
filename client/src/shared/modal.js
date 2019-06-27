import React from 'react';
// import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
/* --- Components --- */
import IconButton from './iconButton';
import Loader from './loader';

const Modal = Loader({
  loader: () =>
    import('@material-ui/core/Modal' /* webpackChunkName: 'modal' */),
});
const MessageBox = Loader({
  loader: () =>
    import('./message/messageBox' /* webpackChunkName: 'messageBox' */),
});

const styles = theme => ({
  modal: {
    overflowX: 'scroll',
    overflowY: 'scroll',
  },
  paper: {
    position: 'absolute',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const SimpleModal = ({
  show,
  messageShow,
  classes,
  component,
  title,
  handleClose,
}) => {
  if (!show) {
    return null;
  }
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        className={classes.modal}
      >
        <div
          className={`tc modal-container ${classes.paper}`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          data-testid="modal"
        >
          <div className="flex justify-end">
            <IconButton
              name="close"
              width="40"
              height="40"
              viewBox="0 0 30 30"
              handleClick={handleClose}
            />
          </div>
          <h3 variant="title" className="f-en">
            {title}
          </h3>
          {component}
          {messageShow !== null && <MessageBox />}
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
  messageShow: state.message.show,
});

export const Unwrapped = SimpleModal;
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(SimpleModal);
