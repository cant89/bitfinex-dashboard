import { ACTION_TYPES } from '../../constants/trades';
import {
  ITradesWsInfo,
  ITradesWsRequest,
  ITradesWsSnapshot,
  ITradesWsSubscribed,
  ITradesWsUpdate,
  TTrade
} from 'actions/trades';

export type TTradesInitialState = {
  data: TTrade[];
  isLoading?: boolean;
  error?: any;
};

export const initialTradesState: TTradesInitialState = {
  isLoading: true,
  data: []
};

const trades = (
  state: TTradesInitialState = initialTradesState,
  {
    type,
    payload
  }:
    | ITradesWsInfo
    | ITradesWsRequest
    | ITradesWsSnapshot
    | ITradesWsSubscribed
    | ITradesWsUpdate
) => {
  if (type === ACTION_TYPES.TRADES_WS_REQUEST) {
    return {
      ...state,
      isLoading: true,
      data: undefined
    };
  }

  if (type === ACTION_TYPES.TRADES_WS_SNAPSHOT) {
    return {
      ...state,
      isLoading: false,
      data: payload
    };
  }

  if (type === ACTION_TYPES.TRADES_WS_MESSAGE) {
    if ((payload as ITradesWsUpdate['payload']).updateType === 'te') {
      return state;
    }

    return {
      ...state,
      data: [
        (payload as ITradesWsUpdate['payload']).trade,
        ...state.data
      ].slice(0, 15)
    };
  }

  return state;
};

export default {
  trades
};
