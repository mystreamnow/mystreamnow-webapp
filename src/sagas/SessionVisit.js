import { put, call, select } from 'redux-saga/effects';
import Request from '../Library/Request/Request';
import { sessionService } from 'redux-react-session';

function apiGet(paramsRouter) {
  const { params } = paramsRouter.params;
  const { type } = paramsRouter.params;
  return Request.post(`userType`, {
    code: params.code,
    customer: type,
    userId: params.userid,
  });
}

export default function* getSession() {
  try {
    const paramsRouter = yield select(state => state.ParamsRouter);
    const response = yield call(apiGet, paramsRouter);
    let session = response.data;

    if (session) {
      let person = session.person.customer;
      let user = session.user.customer;
      let type;
      if (person) {
        type = 1;
      }
      if (user) {
        type = 2;
      }

      sessionService
        .saveSession({ session })
        .then(() => {
          sessionService.saveUser({
            me: {
              id: session.person.id,
              name: session.person.name,
              email: session.person.email,
              type: type,
            },
            session: session,
          });
        })
        .catch(err => console.error(err));

      const sessionCookie = yield select(state => state.session);

      yield put({
        type: 'ASYNC_SUCCESS_SESSIONREQUEST_LIST',
        payload: {
          data: sessionCookie,
        },
      });
    }
  } catch (err) {
    yield put({ type: 'FAILURE_SESSIONREQUEST_LIST' });
  }
}
