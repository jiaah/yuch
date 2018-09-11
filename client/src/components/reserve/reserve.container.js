import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import ReserveForms from './reserve.forms';
/* --- Actions --- */
import { openReserve, saveReserveInfo } from './reserve.action';

class Reserve extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    this.props.onOpenReserve();
  };

  handleChange = ev => {
    ev.preventDefault();
    const { id, value } = ev.target;
    this.props.onSaveReserveInfo(id, value);
  };

  render() {
    console.log('reserveInfo', this.props.reserveInfo);
    console.log('show: ', this.props.show);
    const { show } = this.props;
    return (
      <div className="tc white reserve-container">
        <p>기업체 각종 행사, 모임 단체 식사 주문받습니다&#46;</p>
        <button
          type="button"
          className="btn white f-regular"
          onClick={this.handleClick}
        >
          Reservation
        </button>
        {show ? <ReserveForms handleChange={this.handleChange} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reserveInfo: state.reservation.reserve,
  show: state.reservation.show,
});

const mapDispatchToProps = dispatch => ({
  onSaveReserveInfo: (id, value) => dispatch(saveReserveInfo(id, value)),
  onOpenReserve: () => dispatch(openReserve()),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withStyles(styles)(Reserve));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reserve);
