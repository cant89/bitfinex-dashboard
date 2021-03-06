import { getActionByMessage } from '../helpers';
import {
  tickerWsInfo,
  tickerWsSubscribed,
  tickerWsMessage
} from '../../../actions/ticker';
import { ERR_CONNECTION_LOST } from '../../../services/ws';
import { connectionLost } from '../../../actions/app';

describe('Ticker Saga Helper', () => {
  it('getActionByMessage should return proper object when message is of isPong', () => {
    const result = getActionByMessage({
      event: 'pong'
    });
    expect(result).toEqual({});
  });

  it('getActionByMessage should return proper object when message is of isHearthBeat', () => {
    const result = getActionByMessage([1, 'hb']);
    expect(result).toEqual({});
  });

  it('getActionByMessage should return proper object when message is of isInfo', () => {
    const result = getActionByMessage({
      event: 'info',
      serverId: 123
    });
    expect(result).toEqual({
      action: tickerWsInfo,
      payload: {
        serverId: 123
      }
    });
  });

  it('getActionByMessage should return proper object when message is of isSubscribed', () => {
    const result = getActionByMessage({
      event: 'subscribed'
    });
    expect(result).toEqual({
      action: tickerWsSubscribed
    });
  });

  it('getActionByMessage should return proper object when message is of isTickerMessage', () => {
    const result = getActionByMessage([123, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
    expect(result).toEqual({
      action: tickerWsMessage,
      payload: {
        BID: 1,
        BID_SIZE: 2,
        ASK: 3,
        ASK_SIZE: 4,
        DAILY_CHANGE: 5,
        DAILY_CHANGE_RELATIVE: 6,
        LAST_PRICE: 7,
        VOLUME: 8,
        HIGH: 9,
        LOW: 10
      }
    });
  });

  it('getActionByMessage should return proper object when message is of isConnectionLost', () => {
    const result = getActionByMessage({
      event: ERR_CONNECTION_LOST
    });

    expect(result).toEqual({
      action: connectionLost
    });
  });

  it('getActionByMessage should return empty object when message is not matching', () => {
    const result = getActionByMessage({
      event: 'not defined'
    });

    expect(result).toEqual({});
  });
});
