import { action } from 'typesafe-actions';
import { ACTION_TYPES } from '../../constants/trades';
import { AnyAction } from 'redux';

export interface ITradesWsRequest extends AnyAction {
  payload: string;
}

export interface ITradesWsOnMessage extends AnyAction {
  payload: object;
}

export const tradesWsRequest = (
  payload: ITradesWsRequest['payload']
): ITradesWsRequest => action(ACTION_TYPES.TRADES_WS_REQUEST, payload);

export const tradesWsOnMessage = (
  payload: ITradesWsOnMessage['payload']
): ITradesWsOnMessage => action(ACTION_TYPES.TRADES_WS_ON_MESSAGE, payload);
