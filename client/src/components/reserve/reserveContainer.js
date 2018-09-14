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

  handleChange = ev => {
    ev.preventDefault();
    const { id, value } = ev.target;
    return this.props.onSaveReserveInfo(id, value);
  };

  handleSave = async () => {
    const { reserveInfo, onReserve, onButtonClicked, btnClicked } = this.props;
    const { today } = moment;
    const { name, contact, number, place, date, time } = reserveInfo;
    const finalReserveInfo = {
      name: reserveInfo.name,
      contact: reserveInfo.contact,
      number: reserveInfo.number,
      place: reserveInfo.place,
      date: reserveInfo.date,
      time: reserveInfo.time,
      at: today,
    };
    await onButtonClicked();
    // fix contact error text condition !!!!!!!!!
    if (btnClicked) {
      if (
        name === '' ||
        contact === '' ||
        number === '' ||
        place === '' ||
        date === '' ||
        time === ''
      ) {
        return null;
      }
      return onReserve(finalReserveInfo);
    }
  };

  render() {
    const { tommrow } = moment;
    const { show, reserveInfo, submitText, btnClicked } = this.props;

    return (
      <div>
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
