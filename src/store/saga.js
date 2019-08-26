// takeEvery
import { takeLatest } from 'redux-saga/effects';
import getSession from '../sagas/Session';
import Broadcasting from '../sagas/Broadcasting';

export default function * root () {
  yield takeLatest('REQUEST_SESSIONREQUEST_LIST', getSession);
  yield takeLatest('REQUEST_BROADCASTING_START', Broadcasting);
}
