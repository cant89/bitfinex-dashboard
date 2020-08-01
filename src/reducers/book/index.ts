import { ACTION_TYPES } from '../../constants/book';

export type TBookInitialState = {
  data: any;
  isLoading?: boolean;
  error?: any;
};

export const initialBookState: TBookInitialState = {
  isLoading: true,
  data: { asks: [], bids: [] }
};

const book = (
  state: TBookInitialState = initialBookState,
  { type, payload }: any
) => {
  if (type === ACTION_TYPES.BOOK_WS_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (type === ACTION_TYPES.BOOK_WS_ON_MESSAGE) {
    const data = payload.orders.reduce((acc, order) => {
      return {
        bids: order.AMOUNT > 0 ? [order, ...acc.bids] : acc.bids,
        asks: order.AMOUNT <= 0 ? [order, ...acc.asks] : acc.asks
      };
    }, state.data);

    return {
      ...state,
      data: {
        bids: data.bids.slice(0, 25),
        asks: data.asks.slice(0, 25)
      },
      isLoading: false
    };
  }

  return state;
};

export default {
  book
};
