import React, { Component } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import Loader from '../../../utils/loader';
import Buttons from '../../../shared/buttons';
import * as moment from '../../../shared/moment';
/* --- Actions --- */
import { reserve, resetReserve } from '../reserveAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});
const SwitchReserve = Loader({
  loader: () =>
    import('./switchReserve' /* webpackChunkName: 'switchReserve' */),
});
/* react/no-unused-state:false */
class ReserveContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      show: false,
      name: '',
      contact: '(0  )    -    ',
      number: '',
      place: '',
      date: moment.tomorrow,
      time: '12:30',
    };
  }

  handleOpen = () => this.setState({ show: true });

  handleClose = () => {
    this.setState({ show: false });
    this.props.onResetReserve();
  };

  handleChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  handleSave = ev => {
    ev.preventDefault();
    const { onReserve } = this.props;
    const { name, contact, number, place, date, time } = this.state;
    const reserveInfo = {
      name,
      contact,
      number,
      place,
      date,
      time,
      createdAt: moment.timeStamp,
    };
    return onReserve(reserveInfo);
  };

  render() {
    const { apiRequest } = this.props;
    const { show } = this.state;
    const { tomorrow } = moment;

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
            show={show}
            handleClose={this.handleClose}
            component={
              <SwitchReserve
                apiRequest={apiRequest}
                reserveInfo={this.state}
                tomorrow={tomorrow}
                handleChange={this.handleChange}
                handleSave={this.handleSave}
                handleClose={this.handleClose}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiRequest: state.reserve.apiRequest,
});

const mapDispatchToProps = dispatch => ({
  onReserve: reserveInfo => dispatch(reserve(reserveInfo)),
  onResetReserve: () => dispatch(resetReserve()),
});

export const Unwrapped = ReserveContainer;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReserveContainer);
