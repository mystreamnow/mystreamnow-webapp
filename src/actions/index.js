export function requestSession (params) {
  return {
    type: 'REQUEST_SESSIONREQUEST_LIST',
    payload: {
      params
    }
  };
}
