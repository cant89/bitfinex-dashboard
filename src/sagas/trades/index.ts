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

  try {
    while (true) {
      const message = yield take(channel);
      console.log('here is the message: ', message);

      const { action, payload } = getActionByMessage(message);

      console.log(action, payload);

      if (action) {
        yield put(action(payload));
      }
    }
  } finally {
    console.log('end');
  }
}

export function* watchTradesWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TRADES_WS_REQUEST, onTradesWsOnRequest);
}
