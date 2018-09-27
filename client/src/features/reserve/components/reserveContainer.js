import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Loader from '../../../utils/loader';
import * as moment from '../../../shared/moment';
/* --- Actions --- */
import {
  showReserve,
  saveReserveInfo,
  reserve,
  resetReserve,
} from '../reserve.action';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '8em',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
});

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
    const { classes, show, reserveInfo, submitText } = this.props;

    return (
      <div id="reserve">
        <div className="tc white reserve-container">
          <h3 className="white f-en">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Button
            onClick={this.handleOpen}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            예약하기
          </Button>
        </div>
        {show && (
          <SimpleModal
            submitText={submitText}
            show={show}
            tommrow={tommrow}
            reserveInfo={reserveInfo}
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
  reserveInfo: state.reserve.reserve,
  show: state.reserve.show,
  submitText: state.reserve.submitText,
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
)(withStyles(styles)(ReserveContainer));
