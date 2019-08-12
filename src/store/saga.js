// takeEvery
import { takeLatest } from 'redux-saga/effects';
import getSession from '../sagas/Session';

export default function * root () {
  yield takeLatest('REQUEST_SESSIONREQUEST_LIST', getSession);
}
