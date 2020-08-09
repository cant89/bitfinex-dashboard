import reducers, { initialTradesState } from '../';
import { ACTION_TYPES } from '../../../constants/trades';

const sampleTrade = {
  ID: 123,
  MTS: 123,
  AMOUNT: 123,
  PRICE: 123
};

describe('Trades Reducers', () => {
  it('should return the proper state when the action is TRADES_WS_REQUEST', () => {
    const result = reducers.trades(initialTradesState, {
      type: ACTION_TYPES.TRADES_WS_REQUEST
    });

    expect(result).toEqual({
      ...initialTradesState,
      isLoading: true,
      data: []
    });
  });

  it('should return the proper state when the action is TRADES_WS_SNAPSHOT', () => {
    const payload = [sampleTrade, { ...sampleTrade, ID: 456 }];
    const result = reducers.trades(initialTradesState, {
      type: ACTION_TYPES.TRADES_WS_SNAPSHOT,
      payload
    });

    expect(result).toEqual({
      ...initialTradesState,
      isLoading: false,
      data: payload
    });
  });

  it('should return the proper state when the action is TRADES_WS_MESSAGE and the updateType is tu', () => {
    const initialState = {
      ...initialTradesState,
      isLoading: false,
      data: [sampleTrade]
    };

    const payload = {
      trade: { ...sampleTrade, ID: 456 },
      updateType: 'tu'
    };

    const result = reducers.trades(initialState, {
      type: ACTION_TYPES.TRADES_WS_MESSAGE,
      payload
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      data: [payload.trade, sampleTrade]
    });
  });

  it('should return the proper state when the action is TRADES_WS_MESSAGE and the updateType is te', () => {
    const initialState = {
      ...initialTradesState,
      isLoading: false,
      data: [sampleTrade]
    };

    const payload = {
      trade: { ...sampleTrade, ID: 456 },
      updateType: 'te'
    };

    const result = reducers.trades(initialState, {
      type: ACTION_TYPES.TRADES_WS_MESSAGE,
      payload
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      data: [sampleTrade]
    });
  });
});
