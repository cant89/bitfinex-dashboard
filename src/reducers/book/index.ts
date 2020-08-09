import { ACTION_TYPES } from '../../constants/book';
import {
  IBookWsInfo,
  IBookWsRequest,
  IBookWsSnapshot,
  IBookWsSubscribed,
  IBookWsMessage,
  TBookOrder
} from 'actions/book';

export type TBookInitialState = {
  data: {
    asks: TBookOrder[];
    bids: TBookOrder[];
  };
  isLoading?: boolean;
  error?: any;
};

export const initialBookState: TBookInitialState = {
  isLoading: true,
  data: {
    asks: [],
    bids: []
  }
};

const addOrderToBookData = (
  order: TBookOrder,
  book: TBookInitialState['data']
) => {
  return {
    bids: Number(order.AMOUNT) > 0 ? [order, ...book.bids] : book.bids,
    asks: Number(order.AMOUNT) <= 0 ? [order, ...book.asks] : book.asks
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
) => {
  if (type === ACTION_TYPES.BOOK_WS_REQUEST) {
    return {
      ...state,
      isLoading: true,
      data: {
        asks: [],
        bids: []
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
        bids: bids.slice(0, 25),
        asks: asks.slice(0, 25)
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
        bids: bids.slice(0, 25),
        asks: asks.slice(0, 25)
      }
    };
  }

  if (type === ACTION_TYPES.BOOK_WS_CLOSE) {
    return {
      ...state,
      isLoading: false,
      data: {
        asks: [],
        bids: []
      }
    };
  }

  return state;
};

export default {
  book
};
