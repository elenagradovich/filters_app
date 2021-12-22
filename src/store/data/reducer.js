import { ActionTypes } from '../action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  searchResults: [],
  historyResults: [],
  dataLoading: false,
  citiesByCountry: [],
  errorMessage: null,
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.DATA_LOADING_START:{
      return {
        ...state,
        dataLoading: true,
      };
    }
    case ActionTypes.DATA_LOADING_END:{
      return {
        ...state,
        dataLoading: false,
      };
    }
    case ActionTypes.SEARCH_RESULTS:{
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    case ActionTypes.HISTORY_RESULTS:
      return {
        ...state,
        historyResults: action.payload,
      };
    case ActionTypes.CITIIES_LIST:
      return {
        ...state,
        citiesByCountry: action.payload,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

