export const hydrateObject = object => {
  let rows;
  object.map(data => {
    rows = { data };
    return rows;
  });

  return rows.data;
};

export const getEnv = name => {
  let env = "";

  switch (name) {
    default:
      env = process.env[`REACT_APP_${name}`];
  }

  return env;
};

export const getApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_URL_API_PROD;
  }

  return process.env.REACT_APP_URL_API_DEV;
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
    name = "Internet Explorer";
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    name = "Firefox";
  } else if (
    !!window["opr"] ||
    !!window["opera"] ||
    navigator.userAgent.indexOf(" OPR/") >= 0
  ) {
    name = "Opera";
  } else if (
    !!window["chrome"] ||
    navigator.userAgent.indexOf("Chrome") !== -1
  ) {
    name = "Chrome";
  } else if (
    !!window["safari"] ||
    navigator.userAgent.indexOf("Safari") !== -1
  ) {
    name = "Safari";
  }
  return name;
};
