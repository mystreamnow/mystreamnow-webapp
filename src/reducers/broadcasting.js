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
