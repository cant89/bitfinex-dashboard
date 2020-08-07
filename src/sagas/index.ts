import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import * as appSagas from './app';
import * as tickerSagas from './ticker';
import * as tradesSagas from './trades';
import * as bookSagas from './book';

function* root(): SagaIterator {
  yield all([
    fork(appSagas.watchConnectionLostAction),
    fork(tickerSagas.watchTickerWsOnRequestAction),
    fork(tradesSagas.watchTradesWsOnRequestAction),
    fork(bookSagas.watchBookWsOnRequestAction)
  ]);
}

export default root;
