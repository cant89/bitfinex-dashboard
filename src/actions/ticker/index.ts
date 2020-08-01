import { action } from 'typesafe-actions';
import { ACTION_TYPES } from '../../constants/ticker';
import { AnyAction } from 'redux';

export interface ITickerWsRequest extends AnyAction {
  payload: string;
}

export interface ITickerWsOnMessage extends AnyAction {
  payload: object;
}

export const tickerWsRequest = (
  payload: ITickerWsRequest['payload']
): ITickerWsRequest => action(ACTION_TYPES.TICKER_WS_REQUEST, payload);

export const tickerWsOnMessage = (
  payload: ITickerWsOnMessage['payload']
): ITickerWsOnMessage => action(ACTION_TYPES.TICKER_WS_ON_MESSAGE, payload);
