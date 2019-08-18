import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { sessionReducer } from 'redux-react-session';
import AllowCam from './allowCam';
import AllowMic from './allowMic';
import OpentokSession from './opentokSession';
import Layout from './layout';
import { ScreenShare } from './screenShare';
import { entities } from './entities';

const rootReducer = combineReducers({
  session: sessionReducer,
  locale: localeReducer,
  OpentokSession,
  Layout,
  entities,
  ScreenShare,
  AllowCam,
  AllowMic
});

export default rootReducer;
