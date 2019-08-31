const INITIAL_STATE = {
  data: [],
  loading: true,
  error: false
};

export default function broadcastingStart (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASYNC_SUCCESS_BROADCASTING_START':
      return {
        data: action.payload.data,
        loading: false,
        error: false
      };
    case 'FAILURE_BROADCASTING_START':
      return { data: [], total: 0, loading: false, error: true };
    default:
      return state;
  }
}

export function broadcastingStop (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASYNC_SUCCESS_BROADCASTING_STOP':
      return {
        data: action.payload.data,
        loading: false,
        error: false
      };
    case 'FAILURE_BROADCASTING_STOP':
      return { data: [], total: 0, loading: false, error: true };
    default:
      return state;
  }
}

export const BroadcastingOn = (state = false, action) => {
  switch (action.type) {
    case 'BROADCASTING_ON':
      return action.boolean;
    default:
      return state;
  }
};
