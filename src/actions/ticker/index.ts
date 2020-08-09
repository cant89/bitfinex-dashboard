import { action } from 'typesafe-actions';
import { ACTION_TYPES } from '../../constants/ticker';
import { AnyAction } from 'redux';

export interface ITickerWsRequest extends AnyAction {
  payload: string;
}

export const tickerWsRequest = (
  payload: ITickerWsRequest['payload']
): ITickerWsRequest => action(ACTION_TYPES.TICKER_WS_REQUEST, payload);

export interface ITickerWsInfo extends AnyAction {
  payload: { serverId: string };
}

export const tickerWsInfo = (
  payload: ITickerWsInfo['payload']
): ITickerWsInfo => action(ACTION_TYPES.TICKER_WS_INFO, payload);

export interface ITickerWsSubscribed extends AnyAction {
  payload: {
    chanId: string;
    channel: string;
    pair: string;
    symbol: string;
  };
}

export const tickerWsSubscribed = (
  payload: ITickerWsSubscribed['payload']
): ITickerWsSubscribed => action(ACTION_TYPES.TICKER_WS_SUBSCRIBED, payload);

export type TTicker = {
  BID: number;
  BID_SIZE: number;
  ASK: number;
  ASK_SIZE: number;
  DAILY_CHANGE: number;
  DAILY_CHANGE_RELATIVE: number;
  LAST_PRICE: number;
  VOLUME: number;
  HIGH: number;
  LOW: number;
};
export interface ITickerWsMessage extends AnyAction {
  payload: TTicker;
}

export const tickerWsMessage = (
  payload: ITickerWsMessage['payload']
): ITickerWsMessage => action(ACTION_TYPES.TICKER_WS_MESSAGE, payload);
