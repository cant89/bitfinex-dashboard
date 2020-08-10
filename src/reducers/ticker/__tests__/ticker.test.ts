import reducers, { initialTickerState } from '../';
import { ACTION_TYPES } from '../../../constants/ticker';
import { ITickerWsRequest } from 'actions/ticker';

const sampleTicker = {
  BID: 123,
  BID_SIZE: 123,
  ASK: 123,
  ASK_SIZE: 123,
  DAILY_CHANGE: 123,
  DAILY_CHANGE_RELATIVE: 123,
  LAST_PRICE: 123,
  VOLUME: 123,
  HIGH: 123,
  LOW: 123
};

describe('Ticker Reducers', () => {
  it('should return the proper state when the action is TICKER_WS_REQUEST', () => {
    const result = reducers.ticker(initialTickerState, {
      type: ACTION_TYPES.TICKER_WS_REQUEST
    } as ITickerWsRequest);

    expect(result).toEqual({
      ...initialTickerState,
      isLoading: true,
      data: undefined
    });
  });

  it('should return the proper state when the action is TICKER_WS_MESSAGE', () => {
    const result = reducers.ticker(initialTickerState, {
      type: ACTION_TYPES.TICKER_WS_MESSAGE,
      payload: sampleTicker
    });

    expect(result).toEqual({
      ...initialTickerState,
      isLoading: false,
      data: sampleTicker
    });
  });
});
