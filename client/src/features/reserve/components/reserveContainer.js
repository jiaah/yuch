import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import Loader from '../../../utils/loader';
import * as moment from '../../../shared/moment';
import Buttons from '../../../shared/buttons';
/* --- Actions --- */
import {
  showReserve,
  saveReserveInfo,
  reserve,
  resetReserve,
} from '../reserve.action';

const SimpleModal = Loader({
  loader: () => import('./simpleModal' /* webpackChunkName: 'SimpleModal' */),
});
class ReserveContainer extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOpen = () => this.props.onShowReserve();

  handleClose = () => this.props.onResetReserve();

  handleChange = ({ target: { id, value } }) =>
    this.props.onSaveReserveInfo(id, value);

  handleSave = ev => {
    ev.preventDefault();
    const {
      reserveInfo: { name, contact, number, place, date, time },
      onReserve,
    } = this.props;
    const { now } = moment;
    const finalReserveInfo = {
      name,
      contact,
      number,
      place,
      date,
      time,
      at: now,
    };
    return onReserve(finalReserveInfo);
  };

  render() {
    const { tommrow } = moment;
    const { show, reserveInfo, apiRequest } = this.props;

    return (
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Buttons
            handleClick={this.handleOpen}
            variantValue="contained"
            colorValue="secondary"
            name="예약하기"
            classNameValue="bigButton"
          />
        </div>
        {show && (
          <SimpleModal
            tommrow={tommrow}
            show={show}
            apiRequest={apiRequest}
            reserveInfo={reserveInfo}
            handleChange={this.handleChange}
            handleSave={this.handleSave}
            handleClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reserveInfo: state.reserve.reserve,
  show: state.reserve.show,
  apiRequest: state.reserve.apiRequest,
});

const mapDispatchToProps = dispatch => ({
  onSaveReserveInfo: (id, value) => dispatch(saveReserveInfo(id, value)),
  onShowReserve: () => dispatch(showReserve()),
  onReserve: reserveInfo => dispatch(reserve(reserveInfo)),
  onResetReserve: () => dispatch(resetReserve()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReserveContainer);
