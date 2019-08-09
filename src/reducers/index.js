import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  session: sessionReducer,
  locale: localeReducer
});

export default rootReducer;
