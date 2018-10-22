import { withStateHandlers, compose } from 'recompose';
import * as moment from '../../../shared/moment';
import { reserve, resetReserve } from '../reserveAction';

const initialState = {
  show: false,
  name: '',
  contact: '(0  )    -    ',
  number: '',
  place: '',
  date: moment.tomorrow,
  time: '12:30',
};

const handleOpen = () => ({
  show: true,
});

const handleClose = () => ({
  show: false,
});

const handleChange = ({ target: { id, value } }) => ({ [id]: value });

const withState = withStateHandlers(initialState, {
  handleOpen,
  handleClose,
  handleChange,
});

export default withState;
