import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
/* --- Components --- */
import ActionTranslate from 'material-ui/SvgIcon';
import ReserveFormsWrapped from './reserve.forms';
import SimpleModalWrapped from './reserve.modal';
/* --- Actions --- */
import { openReserve, saveReserveInfo } from './reserve.action';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Reserve extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
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
    console.log('show: ', this.props.show);

    const { classes, show } = this.props;
    const modalStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <div>
        <div className="tc white reserve-container">
          <h3 className="white">Reservation</h3>
          <p>기업체 각종 행사, 모임 단체 식사 주문받습니다.</p>
          <Button className="btn" onClick={this.handleOpen}>
            지금 예약하기
          </Button>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={show}
          onClose={this.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <ReserveFormsWrapped handleChange={this.handleChange} />
          </div>
        </Modal>
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

const ReserveWrapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Reserve));

export default ReserveWrapped;
