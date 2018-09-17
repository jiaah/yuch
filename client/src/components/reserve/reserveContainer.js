import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import Loader from '../../utils/loader';
import * as moment from '../../shared/moment';
/* --- Actions --- */
import {
  showReserve,
  saveReserveInfo,
  reserve,
  resetReserve,
  buttonClicked,
} from './reserve.action';

const SimpleModal = Loader({
  loader: () => import('./simpleModal' /* webpackChunkName: 'SimpleModal' */),
});
class ReserveContainer extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOpen = () => this.props.onShowReserve();

  handleClose = () => this.props.onResetReserve();

  handleChange = ({ target: { id, value } }) =>
    this.props.onSaveReserveInfo(id, value);

  handleSave = async () => {
    const {
      reserveInfo,
      reserveInfo: { name, contact, number, place, date, time },
      onReserve,
      onButtonClicked,
    } = this.props;
    const { now } = moment;
    const finalReserveInfo = {
      name: reserveInfo.name,
      contact: reserveInfo.contact,
      number: reserveInfo.number,
      place: reserveInfo.place,
      date: reserveInfo.date,
      time: reserveInfo.time,
      at: now,
    };
    await onButtonClicked();

    if (
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
    ) {
      return null;
    }
    return onReserve(finalReserveInfo);
  };

  render() {
    const { tommrow } = moment;
    const { show, reserveInfo, submitText, btnClicked } = this.props;

    return (
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <button
            type="button"
            className="reserve-btn"
            onClick={this.handleOpen}
          >
            예약하기
          </button>
        </div>
        {show && (
          <SimpleModal
            submitText={submitText}
            show={show}
            tommrow={tommrow}
            reserveInfo={reserveInfo}
            btnClicked={btnClicked}
            handleClose={this.handleClose}
            handleChange={this.handleChange}
            handleSave={this.handleSave}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reserveInfo: state.componentsReducer.reservation.reserve,
  show: state.componentsReducer.reservation.show,
  submitText: state.componentsReducer.reservation.submitText,
  btnClicked: state.componentsReducer.reservation.btnClicked,
});

const mapDispatchToProps = dispatch => ({
  onSaveReserveInfo: (id, value) => dispatch(saveReserveInfo(id, value)),
  onShowReserve: () => dispatch(showReserve()),
  onReserve: reserveInfo => dispatch(reserve(reserveInfo)),
  onResetReserve: () => dispatch(resetReserve()),
  onButtonClicked: () => dispatch(buttonClicked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReserveContainer);
