import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import * as moment from '../../shared/moment';
/* --- Actions --- */
import { reserve } from './reserve.action';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Reserve extends React.Component {
  handleChange = ev => {
    ev.preventDefault();
    const { id, value } = ev.target;
    this.props.onReserve(value, '2:00', 2, 'korea');
  };

  render() {
    const { tommrow } = moment;
    console.log(`Component state: ${this.props.reserveInfo}`);
    return (
      <div className="tc white reserve-container">
        <h3 className="white f-xl mb2">Reservation</h3>
        <p>기업체 각종 행사, 모임 단체 식사 주문받습니다&#46;</p>
        <form noValidate className="flex justify-around">
          <TextField
            id="date"
            label="날짜"
            type="date"
            defaultValue={tommrow}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required={true}
            // minDate not working
            mindate={tommrow}
            onChange={ev => this.handleChange(ev)}
          />
          <TextField
            id="time"
            label="시간"
            type="time"
            defaultValue="12:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 100, // 30 min
            }}
            margin="normal"
            required={true}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(`mapSataeToProps: ${state.reserve.reserve}`);
  return {
    reserveInfo: state.reserve.reserve,
  };
};

const mapDispatchToProps = dispatch => ({
  onReserve: () => dispatch(reserve()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Reserve));
