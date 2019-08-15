import { sessionService } from 'redux-react-session';

export const ALLOW_CAM = 'ALLOW_CAM';
export const ALLOW_MIC = 'ALLOW_MIC';
export const COUNT_STREAMS = 'COUNT_STREAMS';
export const OPENTOKSESSION = 'OPENTOKSESSION';

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
