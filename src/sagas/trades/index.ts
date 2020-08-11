import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/trades';
import { openWs } from '../../services/ws';
import { getActionByMessage } from './helpers';
import { ITradesWsRequest } from 'actions/trades';

function* onTradesWsOnRequest({ payload }: ITradesWsRequest): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'trades',
    symbol: payload
  };

  const channel = yield call(openWs, subscribeMessage);

  while (true) {
    const message = yield take(channel);
    console.log('trade saga message', message);
    const { action, payload } = getActionByMessage(message);

    if (action) {
      yield put(action(payload));
    }
  }
}

export function* watchTradesWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TRADES_WS_REQUEST, onTradesWsOnRequest);
}
