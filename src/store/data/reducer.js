import { ActionTypes } from '../action-types';
import Immutable from 'seamless-immutable';
import { MenuItems } from '../../constants/menu';

const initialState = Immutable({
  searchResults: null,
  historyResults: [],
  dataLoading: false,
  resultsLoading: false,
  citiesByCountry: [],
  citiesByCountryTo: [],
  menuType: MenuItems.FLIGHT,
  preselectedRequest: {},
  error: null,
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
    case ActionTypes.RESULTS_LOADING_START:{
      return {
        ...state,
        resultsLoading: true,
      };
    }
    case ActionTypes.RESULTS_LOADING_END:{
      return {
        ...state,
        resultsLoading: false,
      };
    }
    case ActionTypes.MENU_TYPE:{
      return {
        ...state,
        menuType: action.payload,
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
    case ActionTypes.CITIIES_LIST_TO:
      return {
        ...state,
        citiesByCountryTo: action.payload,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.PRESELECTED_REQUEST:
      return {
        ...state,
        preselectedRequest: action.payload,
      };
    default:
      return state;
  }
};

