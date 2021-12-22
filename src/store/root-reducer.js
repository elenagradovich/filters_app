import { combineReducers } from 'redux';
import { reducer as dataReducer }from './data/reducer';

const rootReducer = combineReducers({
  DATA: dataReducer,
});

export default rootReducer;
