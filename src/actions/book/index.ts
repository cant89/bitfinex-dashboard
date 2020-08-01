import { action } from 'typesafe-actions';
import { ACTION_TYPES } from '../../constants/book';
import { AnyAction } from 'redux';

export interface IBookWsRequest extends AnyAction {
  payload: {
    symbol: string;
    precision: string;
  };
}

export interface IBookWsOnMessage extends AnyAction {
  payload: object;
}

export const bookWsRequest = (
  payload: IBookWsRequest['payload']
): IBookWsRequest => action(ACTION_TYPES.BOOK_WS_REQUEST, payload);

export const bookWsClose = (): AnyAction => action(ACTION_TYPES.BOOK_WS_CLOSE);

export const bookWsOnMessage = (
  payload: IBookWsOnMessage['payload']
): IBookWsOnMessage => action(ACTION_TYPES.BOOK_WS_ON_MESSAGE, payload);
