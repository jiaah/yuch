import { Axios } from './axios';
import * as types from './actionTypes';

// get users catering meal prices
export const getCateringRates = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getCateringRates' });
  try {
    const res = await Axios.get('/admin/users/catering/rates');
    const rates = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getCateringRates',
      payload: { rates },
    });
    return rates;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getCateringRates',
      error: 'Getting users list is failed',
    });
  }
};

export const updateReservedPrice = (
  userId,
  reservePrice,
  reserveDate,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateReservedPrice' });
  try {
    await Axios.patch('/admin/users/catering/rates', {
      userId,
      reservePrice,
      reserveDate,
    });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'updateReservedPrice',
    });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateReservedPrice',
      error: 'Getting users list is failed',
    });
  }
};
