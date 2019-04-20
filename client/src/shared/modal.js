import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

/* --- Components --- */
import IconButton from './iconButton';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const SimpleModal = ({ modal, classes, component, title, handleClose }) => (
  <React.Fragment>
    {modal && (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modal}
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
              name="clear"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
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
