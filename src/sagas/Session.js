// ,select
import { put, call } from 'redux-saga/effects';
import Request from '../Library/Request/Request';
import { sessionService } from 'redux-react-session';

function apiGetToken (params) {
  const { emailInput: email } = params;
  return Request.getToken(email);
}

function apiLoginUser (params, token) {
  const { emailInput: email, roomInput: room } = params;

  return Request.postPrivate(
    'videoconference/login',
    {
      idroom: room,
      email: email
    },
    token
  );
}

export default function * getSession (props) {
  try {
    const responseToken = yield call(apiGetToken, props.payload.params);
    if (responseToken) {
      const tokenApi = responseToken.data.token;
      const { data } = yield call(apiLoginUser, props.payload.params, tokenApi);
      const token = data.meeting_identified_room;
      const { history } = props.payload.params;

      let dataUser = {
        me: {
          id: data.users_id,
          name: data.name,
          email: data.email,
          profile_picture: data.profile_picture,
          gender: data.gender
        },
        session: {
          description: data.meeting_description,
          meeting_id: data.meeting_id,
          meeting_identified_room: token,
          meeting_meeting_date: data.meeting_meeting_date,
          meeting_meeting_end: data.meeting_meeting_end,
          meeting_meeting_start: data.meeting_meeting_start,
          meeting_password_room: data.meeting_password_room,
          meeting_recorded: data.meeting_recorded,
          meeting_session_id: data.meeting_session_id,
          meeting_title: data.meeting_title,
          meeting_token: data.meeting_token,
          meeting_waiting_room: data.meeting_waiting_room,
          meeting_broadcasting: data.meeting_broadcasting,
          meeting_broadcasting_check: data.meeting_broadcasting_check
        }
      };

      sessionService
        .saveSession({ token })
        .then(() => {
          sessionService
            .saveUser(dataUser)
            .then(() => {})
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

      // const sessionCookie = yield select(state => state.session);

      yield put({
        type: 'ASYNC_SUCCESS_SESSIONREQUEST_LIST',
        payload: {
          data: dataUser
        }
      });

      history.push('/player');
    }
  } catch (err) {
    yield put({ type: 'FAILURE_SESSIONREQUEST_LIST' });
  }
}
