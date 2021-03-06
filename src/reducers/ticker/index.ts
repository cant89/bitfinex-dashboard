import { ACTION_TYPES } from '../../constants/ticker';
import {
  ITickerWsInfo,
  ITickerWsRequest,
  ITickerWsSubscribed,
  ITickerWsMessage,
  TTicker
} from 'actions/ticker';

export type TTickerInitialState = {
  data?: TTicker;
  isLoading?: boolean;
  error?: any;
};

export const initialTickerState: TTickerInitialState = {
  isLoading: true
};

const ticker = (
  state: TTickerInitialState = initialTickerState,
  {
    type,
    payload
  }: ITickerWsInfo | ITickerWsRequest | ITickerWsSubscribed | ITickerWsMessage
) => {
  if (type === ACTION_TYPES.TICKER_WS_REQUEST) {
    return {
      ...state,
      isLoading: true,
      data: undefined
    };
  }

  if (type === ACTION_TYPES.TICKER_WS_MESSAGE) {
    return {
      ...state,
      isLoading: false,
      data: payload as ITickerWsMessage['payload']
    };
  }

  return state;
};

export default {
  ticker
};
