import React from 'react';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 33,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 6,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing.unit * 36,
      paddingLeft: theme.spacing.unit * 12,
      paddingRight: theme.spacing.unit * 12,
    },
  },
});

const SimpleModal = ({ showModal, classes, component }) => (
  <React.Fragment>
    {showModal && (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModal}
      >
        <div
          className={`tc modal ${classes.paper}`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {component}
        </div>
      </Modal>
    )}
  </React.Fragment>
);
const mapStateToProps = state => ({ showModal: state.modal.show });

export const Unwrapped = SimpleModal;
export default connect(
  mapStateToProps,
  undefined,
)(withStyles(styles)(SimpleModal));
