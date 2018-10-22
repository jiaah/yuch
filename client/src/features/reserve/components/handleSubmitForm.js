import { withHandlers } from 'recompose';
import * as moment from '../../../shared/moment';
import { reserve, resetReserve } from '../reserveAction';

const mapDispatchToProps = withHandlers({
  onReserve: ({ dispatch }) => reserveInfo => dispatch(reserve(reserveInfo)),
  onResetReserve: ({ dispatch }) => () => dispatch(resetReserve()),
});

const handleReserve = ev => {
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
