import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
/* --- Components --- */
import Loader from '../../../shared/loader';
import * as moment from '../../../shared/moment';
/* --- Actions --- */
import { reserve, resetReserve } from '../reserveAction';

/* react/no-unused-state: false */
const SimpleModal = Loader({
  loader: () =>
    import('../../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});
const SwitchReserve = Loader({
  loader: () =>
    import('./switchReserve' /* webpackChunkName: 'switchReserve' */),
});

const styles = theme => ({
  bigButton: {
    margin: theme.spacing.unit,
    width: '9em',
    paddingTop: '5px',
    paddingBottom: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
});
class ReserveContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      submitBtnClicked: false,
      name: '',
      contact: '(0  )    -    ',
      number: '',
      place: '',
      date: moment.inThreeDays,
      time: '12:30',
    };
  }

  handleOpen = () => this.setState({ show: true });

  handleClose = () => {
    this.setState({ show: false });
    this.props.onResetReserve();
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async ev => {
    await ev.preventDefault();
    await this.setState({ submitBtnClicked: true });

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
    return onReserve(reserveInfo);
  };

  render() {
    const { apiRequest, classes } = this.props;
    const { show, submitBtnClicked } = this.state;
    const { inThreeDays } = moment;

    return (
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en b">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Button
            onClick={ev => this.handleOpen(ev)}
            variant="contained"
            color="secondary"
            className={`btn--reserve-modal ${classes.bigButton}`}
          >
            예약하기
          </Button>
        </div>
        {show && (
          <SimpleModal
            show={show}
            handleClose={this.handleClose}
            component={
              <SwitchReserve
                apiRequest={apiRequest}
                reserveInfo={this.state}
                inThreeDays={inThreeDays}
                submitBtnClicked={submitBtnClicked}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
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
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ReserveContainer);
