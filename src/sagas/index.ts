import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import * as tickerSagas from './ticker';
import * as tradesSagas from './trades';
import * as bookSagas from './book';

function* root(): SagaIterator {
  yield all([
    fork(tickerSagas.watchTickerWsOnRequestAction),
    fork(tradesSagas.watchTradesWsOnRequestAction),
    fork(bookSagas.watchBookWsOnRequestAction)
  ]);
}

export default root;
