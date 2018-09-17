import * as types from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    name: '',
    contact: '(0  )    -    ',
    number: '',
    place: '',
    date: tommrow,
    time: '12:30',
    at: '',
  },
  show: false,
  loading: false,
  submitText: '',
  btnClicked: false,
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
        submitText: 'success',
      };
    }
    case types.RESERVE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        submitText: 'error',
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
        submitText: '',
        btnClicked: false,
      };
    }
    case types.BUTTON_CLICKED: {
      return {
        ...state,
        btnClicked: true,
      };
    }
    default:
      return state;
  }
};

export default reserve;
