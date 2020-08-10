import reducers, { initialBookState } from '../';
import { IBookWsRequest } from '../../../actions/book';
import { ACTION_TYPES } from '../../../constants/book';
import { AnyAction } from 'redux';

const sampleAsk = {
  PRICE: 123,
  COUNT: 123,
  AMOUNT: -123
};

const sampleBid = {
  PRICE: 123,
  COUNT: 123,
  AMOUNT: 123
};

describe('Book Reducers', () => {
  it('should return the proper state when the action is BOOK_WS_REQUEST', () => {
    const result = reducers.book(initialBookState, {
      type: ACTION_TYPES.BOOK_WS_REQUEST
    } as IBookWsRequest);

    expect(result).toEqual({
      ...initialBookState,
      isLoading: true,
      data: {
        asks: [],
        bids: []
      }
    });
  });

  it('should return the proper state when the action is BOOK_WS_SNAPSHOT', () => {
    const result = reducers.book(initialBookState, {
      type: ACTION_TYPES.BOOK_WS_SNAPSHOT,
      payload: [sampleAsk, sampleBid]
    });

    expect(result).toEqual({
      ...initialBookState,
      isLoading: false,
      data: {
        asks: [sampleAsk],
        bids: [sampleBid]
      }
    });
  });

  it('should return the proper state when the action is BOOK_WS_MESSAGE', () => {
    const initialState = {
      ...initialBookState,
      isLoading: false,
      data: {
        asks: [sampleAsk],
        bids: [sampleBid]
      }
    };

    const payload = { ...sampleAsk, PRICE: 456 };
    const result = reducers.book(initialState, {
      type: ACTION_TYPES.BOOK_WS_MESSAGE,
      payload
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      data: {
        asks: [payload, sampleAsk],
        bids: [sampleBid]
      }
    });
  });

  it('should return the proper state when the action is BOOK_WS_CLOSE', () => {
    const result = reducers.book(initialBookState, {
      type: ACTION_TYPES.BOOK_WS_CLOSE
    } as AnyAction);

    expect(result).toEqual({
      ...initialBookState,
      isLoading: false,
      data: {
        asks: [],
        bids: []
      }
    });
  });
});
