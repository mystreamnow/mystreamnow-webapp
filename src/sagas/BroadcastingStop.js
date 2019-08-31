import { put, call, select } from 'redux-saga/effects';
import Request from '../Library/Request/Request';

function apiGetToken (email) {
  return Request.getToken(email);
}

function apiStopBroadcasting (params, token) {
  const { meeting_id } = params;

  return Request.postPrivate(
    'broadcasting/stop',
    {
      videoconference_id: meeting_id
    },
    token
  );
}

export default function * BroadcastingStart () {
  const sessionCookie = yield select(state => state.session);

  try {
    const responseToken = yield call(apiGetToken, sessionCookie.user.me.email);

    if (responseToken) {
      const tokenApi = responseToken.data.token;
      const { data } = yield call(
        apiStopBroadcasting,
        sessionCookie.user.session,
        tokenApi
      );

      yield put({
        type: 'ASYNC_SUCCESS_BROADCASTING_STOP',
        payload: {
          data
        }
      });

      let boolean = false;
      yield put({
        type: 'BROADCASTING_ON',
        boolean
      });
    }
  } catch (err) {
    yield put({ type: 'FAILURE_BROADCASTING_STOP' });
  }
}
