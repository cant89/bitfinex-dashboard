import { SagaIterator } from '@redux-saga/core';
import { takeLeading, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/app';
import { ACTION_TYPES as TRADES_ACTION_TYPES } from '../../constants/trades';
import { ACTION_TYPES as BOOK_ACTION_TYPES } from '../../constants/book';
import { ACTION_TYPES as TICKER_ACTION_TYPES } from '../../constants/ticker';
import { connectionRestored } from '../../actions/app';

const CONNECTION_RESTORED_ACTIONS = [
  TRADES_ACTION_TYPES.TRADES_WS_SNAPSHOT,
  BOOK_ACTION_TYPES.BOOK_WS_SNAPSHOT,
  TICKER_ACTION_TYPES.TICKER_WS_MESSAGE
];

function* onConnectionLost(): SagaIterator {
  yield take(CONNECTION_RESTORED_ACTIONS);
  yield put(connectionRestored());
}

export function* watchConnectionLostAction(): SagaIterator {
  yield takeLeading(ACTION_TYPES.CONNECTION_LOST, onConnectionLost);
}
