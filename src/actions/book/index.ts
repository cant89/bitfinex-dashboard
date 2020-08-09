import { action } from 'typesafe-actions';
import { ACTION_TYPES, PRECISION_TYPES } from '../../constants/book';
import { AnyAction } from 'redux';

export interface IBookWsRequest extends AnyAction {
  payload: {
    symbol: string;
    precision: valueof<typeof PRECISION_TYPES>;
  };
}

export const bookWsRequest = (
  payload: IBookWsRequest['payload']
): IBookWsRequest => action(ACTION_TYPES.BOOK_WS_REQUEST, payload);

export interface IBookWsInfo extends AnyAction {
  payload: { serverId: string };
}

export const bookWsInfo = (payload: IBookWsInfo['payload']): IBookWsInfo =>
  action(ACTION_TYPES.BOOK_WS_INFO, payload);

export interface IBookWsSubscribed extends AnyAction {
  payload: {
    chanId: string;
    channel: string;
    pair: string;
    symbol: string;
  };
}

export const bookWsSubscribed = (
  payload: IBookWsSubscribed['payload']
): IBookWsSubscribed => action(ACTION_TYPES.BOOK_WS_SUBSCRIBED, payload);

export type TBookOrder = {
  PRICE: string;
  COUNT: string;
  AMOUNT: string;
};

export interface IBookWsSnapshot extends AnyAction {
  payload: TBookOrder[];
}

export const bookWsSnapshot = (
  payload: IBookWsSnapshot['payload']
): IBookWsSnapshot => action(ACTION_TYPES.BOOK_WS_SNAPSHOT, payload);

export interface IBookWsMessage extends AnyAction {
  payload: TBookOrder;
}

export const bookWsMessage = (
  payload: IBookWsMessage['payload']
): IBookWsMessage => action(ACTION_TYPES.BOOK_WS_MESSAGE, payload);

export const bookWsClose = (): AnyAction => action(ACTION_TYPES.BOOK_WS_CLOSE);
