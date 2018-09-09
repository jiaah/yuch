import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  disableDates = () => {
    const today = new Date();
  };

  render() {
    const today = new Date();
    console.log(today);
    return (
      <div className="tc white reserve-container">
        <h3 className="white f-xl mb2">Reservation</h3>
        <p>기업체 각종 행사, 모임 단체 식사 주문받습니다&#46;</p>
        <form noValidate className="flex justify-around">
          <TextField
            id="date"
            label="날짜"
            // placeholder="날짜"
            type="date"
            // defaultValue={{ today }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value="number"
            required="true"
          />
          <TextField
            id="time"
            label="시간"
            type="time"
            defaultValue="12:30"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 150, // 30 min
            }}
            margin="normal"
            required="true"
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Reserve);
