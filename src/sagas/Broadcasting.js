import { put, call, select } from 'redux-saga/effects';
import Request from '../Library/Request/Request';

function apiGetToken (email) {
  return Request.getToken(email);
}

function apiStartBroadcasting (params, token) {
  const { meeting_session_id, meeting_id } = params;

  return Request.postPrivate(
    'broadcasting/start',
    {
      session: meeting_session_id,
      videoconference_id: meeting_id
    },
    token
  );
}

export default function * Broadcasting () {
  const sessionCookie = yield select(state => state.session);

  try {
    const responseToken = yield call(apiGetToken, sessionCookie.user.me.email);

    if (responseToken) {
      const tokenApi = responseToken.data.token;
      const { data } = yield call(
        apiStartBroadcasting,
        sessionCookie.user.session,
        tokenApi
      );

      yield put({
        type: 'ASYNC_SUCCESS_BROADCASTING_START',
        payload: {
          data
        }
      });
    }
  } catch (err) {
    yield put({ type: 'FAILURE_BROADCASTING_START' });
  }
}
