import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { THistory, TReduxState, TReduxStore, TSaga } from './types';

const getInitialState = () => {
  // TODO: externalise the default initial state
  // in case of server side rendering usage
  const initialState =
    typeof window !== 'undefined' && (window as any).__INITIAL_STATE__
      ? (window as any).__INITIAL_STATE__
      : {
          router: {}
        };

  return initialState;
};

type TConfigureStore = (
  initialState: TReduxState,
  history: THistory,
  reducers: object,
  sagas: TSaga
) => TReduxStore;

export type TOptionType = {
  configureStore: TConfigureStore;
  history: THistory;
  initialState?: TReduxState;
  reducers: object;
  sagas: TSaga;
};

export default class App {
  history: THistory;
  initialState: TReduxState;
  store: TReduxStore;

  constructor(options: TOptionType) {
    const { configureStore, history, initialState, reducers, sagas } = options;

    if (typeof configureStore !== 'function') {
      throw new Error('Invalid createStore factory method');
    }

    if (typeof history === 'undefined' || !history) {
      throw new Error('No valid history provided');
    }

    this.history = history;

    this.initialState = initialState || getInitialState();
    this.store = configureStore(
      this.initialState,
      this.history,
      reducers,
      sagas
    );
  }

  mountToNode(node: HTMLElement): void {
    if (typeof node === 'undefined' || !node) {
      throw new Error('No valid DOM node provided');
    }

    if (typeof document !== 'undefined' && node) {
      ReactDOM.render(<Root store={this.store} history={this.history} />, node);
    }
  }
}
