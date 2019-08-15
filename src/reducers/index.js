import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { sessionReducer } from 'redux-react-session';
import AllowCam from './allowCam';
import AllowMic from './allowMic';
import OpentokSession from './opentokSession';

const rootReducer = combineReducers({
  session: sessionReducer,
  locale: localeReducer,
  OpentokSession,
  AllowCam,
  AllowMic
});

export default rootReducer;
