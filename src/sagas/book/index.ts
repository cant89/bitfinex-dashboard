import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put, fork } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/book';
import { openWs } from '../../services/ws';
import { bookWsOnMessage } from '../../actions/book';
import { formatResponseMessage } from '../../services/formatters/book';

function* onBookWsOnRequest({ payload }: any): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'book',
    symbol: payload.symbol,
    freq: 'F0',
    prec: payload.precision
  };

  const channel = yield call(openWs, subscribeMessage);
  yield fork(watchChannelClose, { channel });

  while (true) {
    const message = yield take(channel);
    const formattedMessage = formatResponseMessage(message);
    yield put(bookWsOnMessage(formattedMessage));
  }
}

export function* watchBookWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.BOOK_WS_REQUEST, onBookWsOnRequest);
}

function* watchChannelClose({ channel }): SagaIterator {
  yield takeEvery(ACTION_TYPES.BOOK_WS_CLOSE, channel.close);
}
