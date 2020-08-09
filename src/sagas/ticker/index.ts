import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/ticker';
import { openWs } from '../../services/ws';
import { getActionByMessage } from './helpers';
import { ITickerWsRequest } from '../../actions/ticker';

function* onTickerWsOnRequest({ payload }: ITickerWsRequest): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: payload
  };

  const channel = yield call(openWs, subscribeMessage);

  while (true) {
    const message = yield take(channel);
    const { action, payload } = getActionByMessage(message);

    if (action) {
      yield put(action(payload));
    }
  }
}

export function* watchTickerWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TICKER_WS_REQUEST, onTickerWsOnRequest);
}
