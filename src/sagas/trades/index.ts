import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/trades';
import { openWs } from '../../services/ws';
import { tradesWsOnMessage } from '../../actions/trades';
import { formatResponseMessage } from '../../services/formatters/trades';

function* onTradesWsOnRequest({ payload }: any): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'trades',
    symbol: payload
  };

  const channel = yield call(openWs, subscribeMessage);

  while (true) {
    const message = yield take(channel);
    const formattedMessage = formatResponseMessage(message);
    yield put(tradesWsOnMessage(formattedMessage));
  }
}

export function* watchTradesWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TRADES_WS_REQUEST, onTradesWsOnRequest);
}
