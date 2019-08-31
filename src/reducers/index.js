import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { sessionReducer } from 'redux-react-session';
import AllowCam from './allowCam';
import AllowMic from './allowMic';
import AllowAspectRatio from './aspectRatio';
import ConnectedUser from './connectedUser';
import OpentokSession from './opentokSession';
import Layout from './layout';
import LayoutBroadcast from './layoutBroadcast';
import broadcastingStart, {
  broadcastingStop,
  BroadcastingOn
} from './broadcasting';
import { ScreenShare } from './screenShare';
import { entities } from './entities';

const rootReducer = combineReducers({
  session: sessionReducer,
  locale: localeReducer,
  OpentokSession,
  Layout,
  entities,
  ScreenShare,
  aspectratio: AllowAspectRatio,
  connecteduser: ConnectedUser,
  layoutbroadcast: LayoutBroadcast,
  broadcastingStart,
  broadcastingStop,
  broadcastingon: BroadcastingOn,
  AllowCam,
  AllowMic
});

export default rootReducer;
