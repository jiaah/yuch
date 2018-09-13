import * as types from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    name: '',
    contact: '(0  )    -    ',
    number: '',
    place: '',
    date: tommrow,
    time: '12:30',
    at: '',
  },
  show: false,
  loading: false,
  error: '',
  displayMessage: '',
};

const reserve = (state = initialState, action) => {
  const { id, value } = action;

  switch (action.type) {
    case types.SAVE_RESERVE_INFO: {
      return {
        ...state,
        reserve: {
          ...state.reserve,
          [id]: value,
        },
      };
    }
    case types.SHOW_RESERVE: {
      return {
        ...state,
        show: !state.show,
      };
    }
    case types.RESERVE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RESERVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        displayMessage: 'success',
      };
    }
    case types.RESERVE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        displayMessage: 'error',
      };
    }
    case types.RESET_RESERVE: {
      return {
        ...state,
        reserve: {
          ...state.reserve,
          name: '',
          contact: '(0  )    -    ',
          number: '',
          place: '',
          date: tommrow,
          time: '12:30',
          at: '',
        },
        show: false,
        error: '',
        displayMessage: '',
      };
    }
    default:
      return state;
  }
};

export default reserve;
