export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const REQUEST_SESSIONREQUEST_LIST = 'REQUEST_SESSIONREQUEST_LIST';

export function requestSession (params) {
  return {
    type: REQUEST_SESSIONREQUEST_LIST,
    payload: {
      params
    }
  };
}
