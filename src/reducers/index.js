import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { sessionReducer } from 'redux-react-session';
import AllowCam from './allowCam';
import AllowMic from './allowMic';

const rootReducer = combineReducers({
  session: sessionReducer,
  locale: localeReducer,
  AllowCam,
  AllowMic
});

export default rootReducer;
