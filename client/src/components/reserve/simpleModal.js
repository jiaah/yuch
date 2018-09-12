import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
/* --- Components --- */
import Pickers from './pickers';
import TextFields from './textFields';

const SimpleModal = ({ show, contactNumber, handleClose, handleChange }) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={show}
    onClose={handleClose}
  >
    <div className="tc modal">
      <h3 variant="title" id="modal-title" className="mb2">
        Reservation
      </h3>
      <Typography variant="subheading" id="simple-modal-description">
        예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을
        못받으시면, 유청으로 연락주시길 바랍니다.
      </Typography>
      <div className="reserve-form--box tc">
        <TextFields contactNumber={contactNumber} handleChange={handleChange} />
        <Pickers handleChange={handleChange} />
      </div>
    </div>
  </Modal>
);

export default SimpleModal;
