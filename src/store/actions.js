import { ActionTypes } from './action-types';
import { getData, getCities } from '../services/data';
import { deleteKeys } from '../utils/obj';
import { v4 as uuid } from 'uuid';
import humps from 'humps';
import browserHistory from '../history/browser-history';
import * as RoutePath from '../constants/route-pathes';

const { DATA_LOADING_START, CITIIES_LIST, CITIIES_LIST_TO,
  DATA_LOADING_END, SEARCH_RESULTS, HISTORY_RESULTS,
  PRESELECTED_REQUEST, MENU_TYPE, ERROR} = ActionTypes;

// actions
export const getDataByRequest = (params, type) => async (dispatch) => {
  debugger
  const requestDate = new Date();
  const id = uuid();
  const requests = JSON.parse(localStorage.getItem('requests'));
  debugger
  if(requests) {
    localStorage.setItem('requests', JSON.stringify([...requests, {...params, type, requestDate, id}]));
  } else {
    localStorage.setItem('requests', JSON.stringify([{...params, type, requestDate, id}]));
  }
  dispatch({ type: DATA_LOADING_START});
  const payload = await getData(humps.decamelizeKeys(params), type);

  dispatch({ type: DATA_LOADING_END});
  const { searchResults, error } = payload;
  if (searchResults) {
    const result = typeof searchResults === 'object' ? Object.values(searchResults) : searchResults;
    dispatch({ type: SEARCH_RESULTS, payload: result});
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
  const { cities, error } = payload;
  if (cities) {
    const data = cities.map((item) => item.name);
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
  debugger;
  const results = state.DATA.historyResults;
  const newResults = results.filter((item) => item.id !== id);
  localStorage.setItem('requests', JSON.stringify([...newResults]));
  if (newResults) {
    dispatch({ type: HISTORY_RESULTS, payload: newResults});
  }
};

export const getPreselectedRequest = (request)  => async (dispatch) => {
  dispatch({ type: PRESELECTED_REQUEST, payload: request});
  dispatch({ type: MENU_TYPE, payload: request.type});
  const query = deleteKeys(request, ['type', 'requestDate', 'id']);
  debugger
  getDataByRequest(query, request.type);
  getCitiesByCountry(request.countryFrom);
  if(request?.countTo) {
    getCitiesByCountry(request.countryTo, 'to');
  }
  browserHistory.push(RoutePath.SEARCH);
};
