import { SagaIterator } from '@redux-saga/core';
import { takeEvery, call, take, put, fork } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../constants/book';
import { openWs } from '../../services/ws';
import { getActionByMessage } from './helpers';
import { IBookWsRequest, bookWsClosed } from '../../actions/book';

function* onBookWsOnRequest({
  payload: { symbol, precision }
}: IBookWsRequest): SagaIterator {
  const subscribeMessage = {
    event: 'subscribe',
    channel: 'book',
    symbol,
    prec: precision,
    freq: 'F0'
  };

  const channel = yield call(openWs, subscribeMessage);

  yield fork(watchBookWsOnCloseAction, { channel });

  try {
    while (true) {
      const message = yield take(channel);
      const { action, payload } = getActionByMessage(message);

      if (action) {
        yield put(action(payload));
      }
    }
  } finally {
    yield put(bookWsClosed());
  }
}

export function* watchBookWsOnRequestAction(): SagaIterator {
  yield takeEvery(ACTION_TYPES.BOOK_WS_REQUEST, onBookWsOnRequest);
}

export function* watchBookWsOnCloseAction({
  channel
}: {
  channel: ReturnType<typeof openWs>;
}): SagaIterator {
  yield takeEvery(ACTION_TYPES.BOOK_WS_CLOSE, channel.close);
}
