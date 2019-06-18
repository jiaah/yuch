import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

// Modal can not use React Hooks as it needs to be able to handle close modal on HTTP Request success in a parent component.
// ex) usersContainer

/* --- Components --- */
import IconButton from './iconButton';
import Loader from './loader';

const FlashMessageBox = Loader({
  loader: () =>
    import('./flashMessageBox' /* webpackChunkName: 'FlashMessageBoxr' */),
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
  flashVariant,
  classes,
  component,
  title,
  handleClose,
}) => (
  <React.Fragment>
    {show && (
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
          {flashVariant !== '' && <FlashMessageBox />}
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
    )}
  </React.Fragment>
);

export const Unwrapped = SimpleModal;
export default withStyles(styles)(SimpleModal);
