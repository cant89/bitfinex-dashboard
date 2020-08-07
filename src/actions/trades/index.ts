import { action } from 'typesafe-actions';
import { ACTION_TYPES } from '../../constants/trades';
import { AnyAction } from 'redux';

export interface ITradesWsRequest extends AnyAction {
  payload: string;
}

export const tradesWsRequest = (
  payload: ITradesWsRequest['payload']
): ITradesWsRequest => action(ACTION_TYPES.TRADES_WS_REQUEST, payload);

export interface ITradesWsInfo extends AnyAction {
  payload: { serverId: string };
}

export const tradesWsInfo = (
  payload: ITradesWsInfo['payload']
): ITradesWsInfo => action(ACTION_TYPES.TRADES_WS_INFO, payload);

export interface ITradesWsSubscribed extends AnyAction {
  payload: {
    chanId: string;
    channel: string;
    pair: string;
    symbol: string;
  };
}

export const tradesWsSubscribed = (
  payload: ITradesWsSubscribed['payload']
): ITradesWsSubscribed => action(ACTION_TYPES.TRADES_WS_SUBSCRIBED, payload);

export type TTrade = {
  ID: string;
  MTS: string;
  AMOUNT: string;
  PRICE: string;
};

export interface ITradesWsSnapshot extends AnyAction {
  payload: TTrade[];
}

export const tradesWsSnapshot = (
  payload: ITradesWsSnapshot['payload']
): ITradesWsSnapshot => action(ACTION_TYPES.TRADES_WS_SNAPSHOT, payload);

export interface ITradesWsUpdate extends AnyAction {
  payload: {
    updateType: string;
    trade: TTrade;
  };
}

export const tradesWsMessage = (
  payload: ITradesWsUpdate['payload']
): ITradesWsUpdate => action(ACTION_TYPES.TRADES_WS_MESSAGE, payload);
