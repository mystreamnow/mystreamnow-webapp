export const ALLOW_CAM = 'ALLOW_CAM';
export const ALLOW_MIC = 'ALLOW_MIC';
export const COUNT_STREAMS = 'COUNT_STREAMS';

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
