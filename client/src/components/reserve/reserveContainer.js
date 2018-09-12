import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import Loader from '../../utils/loader';
/* --- Actions --- */
import { openReserve, saveReserveInfo } from './reserve.action';

const SimpleModal = Loader({
  loader: () => import('./simpleModal' /* webpackChunkName: 'SimpleModal' */),
});
class ReserveContainer extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.props.onOpenReserve();
  };

  handleClose = () => {
    if (this.props.show) this.props.onOpenReserve();
  };

  handleChange = ev => {
    ev.preventDefault();
    const { id, value } = ev.target;
    this.props.onSaveReserveInfo(id, value);
  };

  render() {
    console.log('reserveInfo', this.props.reserveInfo);
    const { show } = this.props;
    return (
      <div>
        <div className="tc white reserve-container">
          <h3 className="white">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <button type="button" className="btn" onClick={this.handleOpen}>
            예약하기
          </button>
        </div>
        {show && (
          <SimpleModal
            show={show}
            handleClose={this.handleClose}
            handleChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    reserveInfo: state.componentsReducer.reservation.reserve,
    show: state.componentsReducer.reservation.show,
  };
};

const mapDispatchToProps = dispatch => ({
  onSaveReserveInfo: (id, value) => dispatch(saveReserveInfo(id, value)),
  onOpenReserve: () => dispatch(openReserve()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReserveContainer);
