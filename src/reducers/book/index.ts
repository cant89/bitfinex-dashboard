import { ACTION_TYPES } from '../../constants/book';
import {
  IBookWsInfo,
  IBookWsRequest,
  IBookWsSnapshot,
  IBookWsSubscribed,
  IBookWsMessage,
  TBookOrder
} from 'actions/book';
import { AnyAction } from 'redux';

export type TBookOrdersList = {
  [PRICE: string]: TBookOrder;
};

export type TBookInitialState = {
  data: {
    asks: TBookOrdersList;
    bids: TBookOrdersList;
  };
  isLoading?: boolean;
  error?: any;
};

export const initialBookState: TBookInitialState = {
  isLoading: true,
  data: {
    asks: {},
    bids: {}
  }
};

const addOrderToBookData = (
  order: TBookOrder,
  book: TBookInitialState['data']
) => {
  const isBid = Number(order.AMOUNT) > 0;
  const isAsk = Number(order.AMOUNT) <= 0;
  const toRemove = order.COUNT === 0;

  if (toRemove && isBid) {
    const { [order.PRICE]: orderToRemove, ...otherBids } = book.bids;

    return {
      ...book,
      bids: otherBids
    };
  }

  if (toRemove && isAsk) {
    const { [order.PRICE]: orderToRemove, ...otherAsks } = book.asks;

    return {
      ...book,
      asks: otherAsks
    };
  }

  return {
    bids: isBid
      ? {
          ...book.bids,
          [order.PRICE]: order
        }
      : book.bids,
    asks: isAsk
      ? {
          ...book.asks,
          [order.PRICE]: order
        }
      : book.asks
  };
};

const book = (
  state: TBookInitialState = initialBookState,
  {
    type,
    payload
  }:
    | IBookWsInfo
    | IBookWsRequest
    | IBookWsSnapshot
    | IBookWsSubscribed
    | IBookWsMessage
    | AnyAction
) => {
  if (type === ACTION_TYPES.BOOK_WS_REQUEST) {
    return {
      ...state,
      isLoading: true,
      data: {
        asks: {},
        bids: {}
      }
    };
  }

  if (type === ACTION_TYPES.BOOK_WS_SNAPSHOT) {
    const { asks, bids } = (payload as IBookWsSnapshot['payload']).reduce(
      (acc, order) => addOrderToBookData(order, acc),
      state.data
    );

    return {
      ...state,
      data: {
        bids: bids,
        asks: asks
      },
      isLoading: false
    };
  }

  if (type === ACTION_TYPES.BOOK_WS_MESSAGE) {
    const { asks, bids } = addOrderToBookData(
      payload as IBookWsMessage['payload'],
      state.data
    );

    return {
      ...state,
      data: {
        bids: bids,
        asks: asks
      }
    };
  }

  if (type === ACTION_TYPES.BOOK_WS_CLOSE) {
    return {
      ...state,
      isLoading: false,
      data: {
        asks: {},
        bids: {}
      }
    };
  }

  return state;
};

export default {
  book
};
