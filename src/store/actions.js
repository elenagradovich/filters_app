import { ActionTypes } from './action-types';
const { DATA_LOADING_START, CITIIES_LIST, DATA_LOADING_END, SEARCH_RESULTS, HISTORY_RESULTS, ERROR} = ActionTypes;
import { getData, getCities } from '../services/data';
import humps from 'humps';

// actions
export const getDataByRequest = (params) => async (dispatch) => {
  debugger
  dispatch({ type: DATA_LOADING_START});
  const payload = await getData(params);
  dispatch({ type: DATA_LOADING_END});
  const { response, error } = payload;
  debugger;
  if (response) {
    const data = humps.camelizeKeys(response);
    dispatch({ type: SEARCH_RESULTS, payload: data});
  } else {
    dispatch({ type: ERROR, payload: { error } });
  }
};

export const getCitiesByCountry = (country) => async (dispatch) => {
  const headers = {
		"x-rapidapi-host": "andruxnet-world-cities-v1.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	};
  debugger
  dispatch({ type: DATA_LOADING_START});
  const payload = await getCities(country, headers);
  dispatch({ type: DATA_LOADING_END});
  const { response, error } = payload;
  debugger;
  if (response) {
    const data = humps.camelizeKeys(response);
    dispatch({ type: CITIIES_LIST, payload: data});
  } else {
    dispatch({ type: ERROR, payload: { error } });
  }
};
