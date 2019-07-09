import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

// get users catering meal prices
export const getCateringRates = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getCateringRates' });
  try {
    const res = await axios.get(`${API_HOST}/admin/users/catering/rates`, {
      headers: { authorization: token },
    });
    const rates = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getCateringRates',
      payload: { rates },
    });
    return rates;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getCateringRates', error });
    throw new Error('Getting users list is failed');
  }
};

export const updateReservedPrice = (
  id,
  reservedDate,
  mealPrice,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateReservedPrice' });
  try {
    await axios.patch(
      `${API_HOST}/admin/users/catering/rates`,
      { id, reservedDate, mealPrice },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'updateReservedPrice',
    });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'updateReservedPrice', error });
    throw new Error('Getting users list is failed');
  }
};
