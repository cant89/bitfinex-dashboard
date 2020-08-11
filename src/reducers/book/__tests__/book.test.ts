import reducers, { initialBookState } from '../';
import { IBookWsRequest } from '../../../actions/book';
import { ACTION_TYPES } from '../../../constants/book';
import { AnyAction } from 'redux';

const sampleAsk = {
  PRICE: 123,
  COUNT: 123,
  AMOUNT: -123
};

const sampleAsksList = {
  [sampleAsk.PRICE]: sampleAsk
};

const sampleBid = {
  PRICE: 123,
  COUNT: 123,
  AMOUNT: 123
};

const sampleBidsList = {
  [sampleBid.PRICE]: sampleBid
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
        asks: {},
        bids: {}
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
        asks: sampleAsksList,
        bids: sampleBidsList
      }
    });
  });

  it('should return the proper state when the action is BOOK_WS_MESSAGE with existing PRICE and its a bid', () => {
    const initialState = {
      ...initialBookState,
      isLoading: false,
      data: {
        asks: sampleAsksList,
        bids: sampleBidsList
      }
    };

    const payload = { PRICE: 123, COUNT: 10, AMOUNT: 115 };
    const result = reducers.book(initialState, {
      type: ACTION_TYPES.BOOK_WS_MESSAGE,
      payload
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      data: {
        asks: sampleAsksList,
        bids: { ...sampleBidsList, [payload.PRICE]: payload }
      }
    });
  });

  it('should return the proper state when the action is BOOK_WS_MESSAGE with new PRICE and its an ask', () => {
    const initialState = {
      ...initialBookState,
      isLoading: false,
      data: {
        asks: sampleAsksList,
        bids: sampleBidsList
      }
    };

    const payload = { ...sampleAsk, PRICE: -456 };
    const result = reducers.book(initialState, {
      type: ACTION_TYPES.BOOK_WS_MESSAGE,
      payload
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      data: {
        asks: { ...sampleAsksList, [payload.PRICE]: payload },
        bids: sampleBidsList
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
        asks: {},
        bids: {}
      }
    });
  });
});
