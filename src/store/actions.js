import { ActionTypes } from './action-types';
import { getData, getCities } from '../services/data';
import { deleteKeys } from '../utils/obj';
import { saveToLocalStorage } from '../utils/storage';

import humps from 'humps';
import browserHistory from '../history/browser-history';
import * as RoutePath from '../constants/route-pathes';

const { DATA_LOADING_START, CITIIES_LIST, CITIIES_LIST_TO,
  DATA_LOADING_END, SEARCH_RESULTS, HISTORY_RESULTS,
  PRESELECTED_REQUEST, MENU_TYPE, ERROR} = ActionTypes;

// actions
export const getDataByRequest = (params, type, notForStorage) => async (dispatch) => {
  !notForStorage && saveToLocalStorage(params, type);
  dispatch({ type: DATA_LOADING_START});
  const payload = await getData(humps.decamelizeKeys(params), type);
  dispatch({ type: DATA_LOADING_END});
  const { response, error } = payload;
  if (response) {
    dispatch({ type: SEARCH_RESULTS, payload: Object.values(response)});
  } else {
    dispatch({ type: ERROR, payload: { error } });
  }
};

export const getCitiesByCountry = (country, direction) => async (dispatch) => {
  const headers = {
    'x-rapidapi-host': 'countries-cities.p.rapidapi.com',
    'x-rapidapi-key': 'e3b66ff24dmsh0d6c8d74115b21ep1871ccjsn2af902c2c682',
  };
  dispatch({ type: DATA_LOADING_START});
  const payload = await getCities(country, headers);
  dispatch({ type: DATA_LOADING_END});
  const { response, error } = payload;
  if (response) {
    const data = response?.cities.map((item) => item.name);
    direction === 'to' ? dispatch({ type: CITIIES_LIST_TO, payload: data}) : dispatch({ type: CITIIES_LIST, payload: data});
  } else {
    dispatch({ type: ERROR, payload: { error } });
  }
};

export const setActiveMenuType = (type) => ({
  type: ActionTypes.MENU_TYPE,
  payload: type,
});

export const resetResponseData = () => ({
  type: ActionTypes.SEARCH_RESULTS,
  payload: null,
});

export const getRequests = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING_START});
  const requests = await JSON.parse(localStorage.getItem('requests'));
  dispatch({ type: DATA_LOADING_END});
  if (requests) {
    dispatch({ type: HISTORY_RESULTS, payload: requests});
  }
};

export const deleteRequest = (id) => async (dispatch, getState) => {
  const state = getState();
  const results = state.DATA.historyResults;
  const newResults = results.filter((item) => item.id !== id);
  localStorage.setItem('requests', JSON.stringify([...newResults]));
  if (newResults) {
    dispatch({ type: HISTORY_RESULTS, payload: newResults});
  }
};

export const getPreselectedRequest = (request)  => async (dispatch, getState) => {

  const state = getState();
  dispatch({ type: PRESELECTED_REQUEST, payload: request});
  dispatch({ type: MENU_TYPE, payload: request.type});
  const query = deleteKeys(request, ['type', 'requestDate', 'id']);
  getDataByRequest(query, request.type, true);
  getCitiesByCountry(request.country);
  if(request?.countryTo !== request.country) {
    getCitiesByCountry(request.countryTo, 'to');
  }
  const citiesByCountry = state.DATA.citiesByCountry;
  if(request?.countryTo === request.country && citiesByCountry) {
    dispatch({ type: CITIIES_LIST_TO, payload: citiesByCountry});
  }
  browserHistory.push(RoutePath.SEARCH);
};
