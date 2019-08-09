export const hydrateObject = object => {
  let rows;
  object.map(data => {
    rows = { data };
  });

  return rows.data;
};

export const getUrlMaterial = material => {
  if (material.type != 5) {
    return `http://d30c5fmxc9293x.cloudfront.net/s/${material.id}/${
      material.versionId
    }/${material.version}/300_300/1/thumbnail.jpg`;
  } else {
    return `https://s3-sa-east-1.amazonaws.com/atitude-files${
      material.thumbSync
    }`;
  }
};

export const _NEW_ = 'NEW';
export const _SPEAKER_ = 'SPEAKER';
export const _MODERATOR_ = 'MODERATOR';

export const getEnvUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_URL_PROD;
  }

  return process.env.REACT_APP_URL_DEV;
};

export const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_URL_API_PROD;
  }

  return process.env.REACT_APP_URL_API_DEV;
};

export const getAdmUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_URL_ADM_PROD;
  }

  return process.env.REACT_APP_URL_ADM_DEV;
};

export const getEnv = name => {
  let env = '';

  switch (name) {
    case 'ATITUDE_LATITUDE':
      env = parseFloat(process.env.REACT_APP_ATITUDE_LATITUDE);
      break;
    case 'ATITUDE_LONGITUDE':
      env = parseFloat(process.env.REACT_APP_ATITUDE_LONGITUDE);
      break;
    default:
      env = process.env[`REACT_APP_${name}`];
  }

  return env;
};

export const jsonValid = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const detectBrowser = () => {
  let name = false;
  if (/* @cc_on!@ */ false || !!document.documentMode) {
    name = 'Internet Explorer';
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    name = 'Firefox';
  } else if (
    !!window['opr'] ||
    !!window['opera'] ||
    navigator.userAgent.indexOf(' OPR/') >= 0
  ) {
    name = 'Opera';
  } else if (
    !!window['chrome'] ||
    navigator.userAgent.indexOf('Chrome') != -1
  ) {
    name = 'Chrome';
  } else if (
    !!window['safari'] ||
    navigator.userAgent.indexOf('Safari') != -1
  ) {
    name = 'Safari';
  }
  return name;
};
