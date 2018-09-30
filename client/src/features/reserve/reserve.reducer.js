import * as types from '../../shared/actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    name: '',
    contact: '(0  )    -    ',
    number: '',
    place: '',
    date: tommrow,
    time: '12:30',
  },
  show: false,
  loading: false,
  apiRequest: '',
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
        apiRequest: 'success',
      };
    }
    case types.RESERVE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        apiRequest: 'error',
      };
    }
    case types.RESET_RESERVE: {
      return {
        ...state,
        reserve: {
          ...state.reserve,
          name: '',
          contact: '(0  )    -    ',
          number: '',
          place: '',
          date: tommrow,
          time: '12:30 PM',
          at: '',
        },
        show: false,
        error: '',
        apiRequest: '',
      };
    }
    default:
      return state;
  }
};

export default reserve;
