import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../../shared/loader';
import * as moment from '../../shared/moment';
import ReserveMessage from './reserveMessage';
/* --- Actions --- */
import * as reserveActions from '../../actions/reserveAction';

/* react/no-unused-state: false */
const Modal = Loader({
  loader: () => import('../../shared/modal' /* webpackChunkName: 'modal' */),
});

const Form = Loader({
  loader: () => import('./reserveForm' /* webpackChunkName: 'reserveForm' */),
});

const styles = theme => ({
  bigButton: {
    color: '#ffffff',
    margin: theme.spacing.unit,
    width: '9em',
    paddingTop: '5px',
    paddingBottom: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
});
export class ReserveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      submitBtnClicked: false,
      name: '',
      contact: '(0  )    -    ',
      number: '',
      place: '',
      date: moment.inThreeDays,
      time: '12:30',
      isReserved: '',
    };
  }

  showModal = () => this.setState({ show: true });

  closeModal = async () => {
    await this.props.reserveActions.resetReserve();
    return this.setState({
      show: false,
      submitBtnClicked: false,
      name: '',
      contact: '(0  )    -    ',
      number: '',
      place: '',
      date: moment.inThreeDays,
      time: '12:30',
      isReserved: '',
    });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async ev => {
    await ev.preventDefault();
    await this.setState({ submitBtnClicked: true });

    const { reserveActions } = this.props;
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
    try {
      await reserveActions.reserve(reserveInfo);
      return this.setState({ isReserved: 'success' });
    } catch (error) {
      return this.setState({ isReserved: 'error' });
    }
  };

  render() {
    const { classes } = this.props;
    const { show, submitBtnClicked, isReserved } = this.state;
    const { inThreeDays } = moment;

    return (
      // id is for Nav Link
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en b" data-testid="reserve-title">
            Reservation
          </h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Button
            onClick={this.showModal}
            variant="contained"
            color="primary"
            className={classes.bigButton}
            data-testid="reserve-modal--button"
          >
            예약하기
          </Button>
        </div>
        {show && (
          <Modal
            show={show}
            messageShow={false}
            title="Reservation"
            handleClose={this.closeModal}
            component={
              isReserved === '' ? (
                <Form
                  reserveInfo={this.state}
                  inThreeDays={inThreeDays}
                  submitBtnClicked={submitBtnClicked}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              ) : (
                <ReserveMessage isReserved={isReserved} />
              )
            }
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  reserveActions: bindActionCreators(reserveActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(ReserveContainer);
