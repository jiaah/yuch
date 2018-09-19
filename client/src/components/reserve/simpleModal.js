import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Pickers from './pickers';
import TextFields from './textFields';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '90px',
  },
});

const SimpleModal = ({
  show,
  tommrow,
  submitText,
  reserveInfo,
  btnClicked,
  handleClose,
  handleChange,
  handleSave,
  classes,
}) => {
  const { name, contact, number, place, date, time } = reserveInfo;
  return (
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
        {submitText === 'success' ? (
          <p>
            예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약
            연락을 못받으시면, 유청으로 연락주시길 바랍니다.
          </p>
        ) : submitText === 'error' ? (
          <p>
            프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로
            전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다. <br />
            <br />
            <span className="b">상담전화 054-745-0999</span>
          </p>
        ) : null}
        {(submitText === '' || submitText === undefined) && (
          <div className="reserve-form--box">
            <TextFields
              reserveInfo={reserveInfo}
              btnClicked={btnClicked}
              handleChange={handleChange}
            />
            <Pickers
              reserveInfo={reserveInfo}
              btnClicked={btnClicked}
              tommrow={tommrow}
              handleChange={handleChange}
            />
          </div>
        )}
        <div>
          {(submitText === '' || submitText === undefined) && (
            <Button
              onClick={handleSave}
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={
                name === '' ||
                contact === '' ||
                contact === '(0  )    -    ' ||
                !!(contact[11].indexOf('_') !== -1) ||
                !!(contact[12].indexOf('_') !== -1) ||
                !!(contact[13].indexOf('_') !== -1) ||
                number === '' ||
                place === '' ||
                date === '' ||
                time === ''
              }
            >
              예약완료
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default withStyles(styles)(SimpleModal);
