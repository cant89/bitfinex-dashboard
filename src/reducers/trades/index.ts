import { ACTION_TYPES } from '../../constants/trades';

export type TTradesInitialState = {
  data: object;
  dataOrder: string[];
  isLoading?: boolean;
  error?: any;
};

export const initialTradesState: TTradesInitialState = {
  isLoading: true,
  data: {},
  dataOrder: []
};

const trades = (
  state: TTradesInitialState = initialTradesState,
  { type, payload }: any
) => {
  if (type === ACTION_TYPES.TRADES_WS_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (type === ACTION_TYPES.TRADES_WS_ON_MESSAGE) {
    const { dataOrder } = state;

    const data = payload.trades.reduce((acc, trade) => {
      !acc[trade.ID] && dataOrder.unshift(trade.ID);

      return {
        ...acc,
        [trade.ID]: trade
      };
    }, state.data);

    return {
      ...state,
      data,
      isLoading: false,
      dataOrder
    };
  }

  return state;
};

export default {
  trades
};
