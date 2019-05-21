import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

// Modal can not use React Hooks as it needs to be able to handle close modal on HTTP Request success in a parent component.
// ex) usersContainer

/* --- Components --- */
import IconButton from './iconButton';
import Loader from './loader';

const FlashMessagesContainer = Loader({
  loader: () =>
    import('./flassMessagesContainer' /* webpackChunkName: 'FlashMessagesContainer' */),
});

const styles = theme => ({
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
        data-testid="modal"
      >
        <div
          className={`tc modal-container ${classes.paper}`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex justify-end">
            <IconButton
              name="close"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              handleClick={handleClose}
            />
          </div>
          <h3 variant="title" className="f-en">
            {title}
          </h3>
          {component}
          {flashVariant !== '' && <FlashMessagesContainer />}
        </div>
      </Modal>
    )}
  </React.Fragment>
);

export const Unwrapped = SimpleModal;
export default withStyles(styles)(SimpleModal);
