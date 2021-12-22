import browserHistory from '../../history/browser-history';
import { ActionTypes } from '../action-types';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionTypes.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
