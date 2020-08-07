import { SagaIterator } from '@redux-saga/core';
import { takeLeading, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/app';
import { ACTION_TYPES as TRADES_ACTION_TYPES } from '../../constants/trades';
import { connectionRestored } from '../../actions/app';

const CONNECTION_RESTORED_ACTIONS = [TRADES_ACTION_TYPES.TRADES_WS_SNAPSHOT];

function* onConnectionLost(): SagaIterator {
  yield take(CONNECTION_RESTORED_ACTIONS);
  yield put(connectionRestored());
}

export function* watchConnectionLostAction(): SagaIterator {
  yield takeLeading(ACTION_TYPES.CONNECTION_LOST, onConnectionLost);
}
