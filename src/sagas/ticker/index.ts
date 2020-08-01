import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/ticker';
import { openWs } from '../../services/ws';
import { tickerWsOnMessage } from '../../actions/ticker';
import { formatResponseMessage } from '../../services/formatters/ticker';

function* onTickerWsOnRequest({ payload }: any): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'ticker',
    symbol: payload
  };

  try {
    const channel = yield call(openWs, subscribeMessage);
    console.log(channel);

    while (true) {
      const message = yield take(channel);
      console.log(message);
      const formattedMessage = formatResponseMessage(message);
      yield put(tickerWsOnMessage(formattedMessage));
    }
  } catch (err) {
    console.log('catching', err);
  }
}

export function* watchTickerWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.TICKER_WS_REQUEST, onTickerWsOnRequest);
}
