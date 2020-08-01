import { ACTION_TYPES } from '../../constants/ticker';

export type TTickerInitialState = {
  data?: string;
  isLoading?: boolean;
  error?: any;
};

export const initialTickerState: TTickerInitialState = {
  isLoading: true
};

const ticker = (
  state: TTickerInitialState = initialTickerState,
  { type, payload }: any
) => {
  if (type === ACTION_TYPES.TICKER_WS_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (type === ACTION_TYPES.TICKER_WS_ON_MESSAGE) {
    return {
      ...state,
      data: payload,
      isLoading: false
    };
  }

  return state;
};

export default {
  ticker
};
