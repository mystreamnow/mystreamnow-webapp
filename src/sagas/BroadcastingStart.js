import { put, call, select } from 'redux-saga/effects';
import Request from '../Library/Request/Request';

function apiGetToken (email) {
  return Request.getToken(email);
}

function apiStartBroadcasting (params, token, layout) {
  const { meeting_session_id, meeting_id } = params;

  return Request.postPrivate(
    'broadcasting/start',
    {
      session: meeting_session_id,
      videoconference_id: meeting_id,
      layout: layout.active
    },
    token
  );
}

export default function * BroadcastingStart () {
  const sessionCookie = yield select(state => state.session);
  const layout = yield select(state => state.layoutbroadcast);

  try {
    const responseToken = yield call(apiGetToken, sessionCookie.user.me.email);

    if (responseToken) {
      const tokenApi = responseToken.data.token;
      const { data } = yield call(
        apiStartBroadcasting,
        sessionCookie.user.session,
        tokenApi,
        layout
      );

      yield put({
        type: 'ASYNC_SUCCESS_BROADCASTING_START',
        payload: {
          data
        }
      });

      let boolean = true;
      yield put({
        type: 'BROADCASTING_ON',
        boolean
      });
    }
  } catch (err) {
    yield put({ type: 'FAILURE_BROADCASTING_START' });
  }
}
