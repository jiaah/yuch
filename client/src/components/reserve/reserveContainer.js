import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../loader';
import * as moment from '../../helpers/moment';
import ReserveMessage from './reserveMessage';
import Modal from '../../shared/modal';
/* --- Actions --- */
import * as reserveActions from '../../actions/reserveAction';
import * as modalActions from '../../actions/modalAction';

const Form = Loader({
  loader: () => import('./reserveForm' /* webpackChunkName: 'reserveForm' */),
});

const styles = theme => ({
  bigButton: {
    color: '#ffffff',
    margin: theme.spacing(1),
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

  showModal = () => this.props.modalActions.showModal();

  closeModal = async () => {
    this.props.modalActions.hideModal();
    await this.props.reserveActions.resetReserve();
    return this.setState({
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

  handleReserveMessage = res => {
    if (!res.error) {
      return this.setState({ isReserved: 'success' });
    }
    return this.setState({ isReserved: 'error' });
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

    const res = await reserveActions.reserve(reserveInfo);
    return this.handleReserveMessage(res);
  };

  render() {
    const { classes } = this.props;
    const { submitBtnClicked, isReserved } = this.state;
    const { inThreeDays } = moment;

    return (
      // id is for Nav Link
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en b" data-testid="reserve-title">
            Reservation
          </h3>
          <p>성당&#44; 교회 각종 행사 모임 출장뷔페 주문받습니다.</p>
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
        <Modal
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  reserveActions: bindActionCreators(reserveActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(ReserveContainer);
