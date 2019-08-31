import { sessionService } from 'redux-react-session';

export const ALLOW_CAM = 'ALLOW_CAM';
export const ALLOW_MIC = 'ALLOW_MIC';
export const COUNT_STREAMS = 'COUNT_STREAMS';
export const OPENTOKSESSION = 'OPENTOKSESSION';
export const SCREEN_SHARE = 'SCREEN_SHARE';
export const CONNECTED_SESSION = 'CONNECTED_SESSION';
export const LAYOUT = 'LAYOUT';
export const LAYOUT_BROADCAST = 'LAYOUT_BROADCAST';
export const ASPECT_RATIO = 'ASPECT_RATIO';
export const BROADCASTING_ON = 'BROADCASTING_ON';
export const REQUEST_BROADCASTING_START = 'REQUEST_BROADCASTING_START';
export const REQUEST_BROADCASTING_STOP = 'REQUEST_BROADCASTING_STOP';

// Eneble or disable CAM
export const allowCam = boolean => {
  return {
    type: ALLOW_CAM,
    boolean
  };
};

// Eneble or disable MIC
export const allowMic = boolean => {
  return {
    type: ALLOW_MIC,
    boolean
  };
};

// Size streams
export const streams = object => {
  return {
    type: COUNT_STREAMS,
    object
  };
};

// Logout User
export const logout = () => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
  };
};

// TokBox Session
export const opentokSession = object => {
  return {
    type: OPENTOKSESSION,
    object
  };
};

// ScreenShare
export const screenShare = boolean => {
  return {
    type: SCREEN_SHARE,
    boolean
  };
};

// Aspect Ratio
export const aspectRatio = boolean => {
  return {
    type: ASPECT_RATIO,
    boolean
  };
};

// Layout do Player
export const layout = object => {
  return {
    type: LAYOUT,
    object
  };
};

// Layout da transmissão
export const layoutBroadcast = object => {
  return {
    type: LAYOUT_BROADCAST,
    object
  };
};

// Connected
export const connectedSession = boolean => {
  return {
    type: CONNECTED_SESSION,
    boolean
  };
};

// Request Start Broadcasting
export function startBroadcasting () {
  return {
    type: REQUEST_BROADCASTING_START
  };
}

// Request Stop Broadcasting
export function stopBroadcasting () {
  return {
    type: REQUEST_BROADCASTING_STOP
  };
}

// Broadcasting On
export const broadcastingOn = boolean => {
  return {
    type: BROADCASTING_ON,
    boolean
  };
};
