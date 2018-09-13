import React from 'react';
import Modal from '@material-ui/core/Modal';
/* --- Components --- */
import Pickers from './pickers';
import TextFields from './textFields';

const SimpleModal = ({
  show,
  tommrow,
  displayMessage,
  reserveInfo,
  handleClose,
  handleChange,
  handleSave,
}) => (
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
      {displayMessage === 'success' ? (
        <p>
          예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을
          못받으시면, 유청으로 연락주시길 바랍니다.
        </p>
      ) : displayMessage === 'error' ? (
        <p>
          프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기
          바랍니다. 불편을 끼쳐드려 죄송합니다. <br />
          <br />
          <span className="b">상담전화 054-745-0999</span>
        </p>
      ) : null}
      {(displayMessage === '' || displayMessage === undefined) && (
        <div className="reserve-form--box">
          <TextFields reserveInfo={reserveInfo} handleChange={handleChange} />
          <Pickers tommrow={tommrow} handleChange={handleChange} />
        </div>
      )}
      <div>
        {(displayMessage === '' || displayMessage === undefined) && (
          <button type="button" className="reserve-btn" onClick={handleSave}>
            예약완료
          </button>
        )}
        <button type="button" className="reserve-btn" onClick={handleClose}>
          닫기
        </button>
      </div>
    </div>
  </Modal>
);

export default SimpleModal;
