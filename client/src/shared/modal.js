import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
/* --- Components --- */
import IconButton from './form/iconButton';
import Loader from './loader';

const Modal = Loader({
  loader: () =>
    import('@material-ui/core/Modal' /* webpackChunkName: 'modal' */),
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

const styleModal = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const SimpleModal = ({ show, classes, component, title, handleClose }) => {
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
          className={`tc box-container ${classes.paper}`}
          style={styleModal}
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
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
});

export const Unwrapped = SimpleModal;
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(SimpleModal);
