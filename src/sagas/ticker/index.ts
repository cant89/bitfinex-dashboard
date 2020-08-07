import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/ticker';
import { openWs } from '../../services/ws';
import { getActionByMessage } from './helpers';

function* onTickerWsOnRequest({ payload }: any): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'ticker',
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

export function* watchTickerWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TICKER_WS_REQUEST, onTickerWsOnRequest);
}
