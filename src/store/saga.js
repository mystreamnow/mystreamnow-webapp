// takeEvery
import { takeLatest } from 'redux-saga/effects';
import getSession from '../sagas/Session';
import BroadcastingStart from '../sagas/BroadcastingStart';
import BroadcastingStop from '../sagas/BroadcastingStop';

export default function * root () {
  yield takeLatest('REQUEST_SESSIONREQUEST_LIST', getSession);
  yield takeLatest('REQUEST_BROADCASTING_START', BroadcastingStart);
  yield takeLatest('REQUEST_BROADCASTING_STOP', BroadcastingStop);
}
