import { History } from 'history';
import { Store } from 'redux';
import { Saga } from 'redux-saga';
import reducers from './reducers';
import { StateType } from 'typesafe-actions';

export type TReduxStore = Store;
export type TReduxState = StateType<typeof reducers>;
export type THistory = History;
export type TSaga = Saga;
export type TTest = string;
export type TErrorState = {
  error?: {
    type: number;
    description: string;
  };
};
