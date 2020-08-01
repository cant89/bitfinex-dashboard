import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { THistory, TReduxState, TSaga, TReduxStore } from '#/types';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true
});

type TCreateRootReducer = (history: THistory, reducers: object) => any;

const createRootReducer: TCreateRootReducer = (history, reducers) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  });

type TConfigureStore = (
  initialState: TReduxState,
  history: THistory,
  reducers: object,
  sagas: TSaga
) => TReduxStore;

const configureStore: TConfigureStore = (
  initialState,
  history,
  reducers,
  sagas
) => {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(history, reducers),
    initialState,
    composeEnhancer(
      applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
    )
  );

  sagaMiddleware.run(sagas);

  return store;
};

export default configureStore;
