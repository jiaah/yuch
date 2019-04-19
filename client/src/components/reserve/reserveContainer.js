import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../../shared/loader';
import * as moment from '../../shared/moment';
import * as data from '../../shared/data';
/* --- Actions --- */
import * as reserveActions from '../../actions/reserveAction';
import * as modalActions from '../../actions/modalAction';

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
class ReserveContainer extends Component {
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
    };
  }

  showModal = () => this.props.modalActions.showModal();

  closeModal = async () => {
    await this.props.modalActions.hideModal();
    await this.props.reserveActions.resetReserve();
    return this.setState({
      submitBtnClicked: false,
      name: '',
      contact: '(0  )    -    ',
      number: '',
      place: '',
      date: moment.inThreeDays,
      time: '12:30',
    });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async ev => {
    await ev.preventDefault();
    await this.setState({ submitBtnClicked: true });

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
      const res = await this.props.reserveActions.reserve(reserveInfo);
      if (res) {
        // eslint-disable-next-line no-alert
        await alert(data.reserveSuccessMessage);
        return this.closeModal();
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(data.reserveErrorMessage);

      // <a className="b" href="tel:+82-54-745-0999">
      //     상담전화&#8201;
      //     <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
      //   </a>
    }
  };

  render() {
    const { modal, classes } = this.props;
    const { submitBtnClicked } = this.state;
    const { inThreeDays } = moment;

    return (
      // id is for Nav Link
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en b">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Button
            onClick={this.showModal}
            variant="contained"
            color="secondary"
            className={classes.bigButton}
            data-test="btn--reserve-modal"
          >
            예약하기
          </Button>
        </div>
        {modal && (
          <Modal
            modal={modal}
            title="Reservation"
            handleClose={this.closeModal}
            component={
              <Form
                reserveInfo={this.state}
                inThreeDays={inThreeDays}
                submitBtnClicked={submitBtnClicked}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  reserveActions: bindActionCreators(reserveActions, dispatch),
});

export const Unwrapped = ReserveContainer;
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ReserveContainer);
