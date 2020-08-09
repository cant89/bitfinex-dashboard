import { getActionByMessage } from '../helpers';
import {
  bookWsInfo,
  bookWsSubscribed,
  bookWsMessage,
  bookWsSnapshot
} from '../../../actions/book';
import { ERR_CONNECTION_LOST } from '../../../services/ws';
import { connectionLost } from '../../../actions/app';

describe('Book Saga Helper', () => {
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
      action: bookWsInfo,
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
      action: bookWsSubscribed
    });
  });

  it('getActionByMessage should return proper object when message is of isBookSnapshot', () => {
    const result = getActionByMessage([
      123,
      [
        [1, 2, 3],
        [4, 5, 6]
      ]
    ]);
    expect(result).toEqual({
      action: bookWsSnapshot,
      payload: [
        { PRICE: 1, COUNT: 2, AMOUNT: 3 },
        { PRICE: 4, COUNT: 5, AMOUNT: 6 }
      ]
    });
  });

  it('getActionByMessage should return proper object when message is of isBookMessage', () => {
    const result = getActionByMessage([123, [1, 2, 3]]);
    expect(result).toEqual({
      action: bookWsMessage,
      payload: { PRICE: 1, COUNT: 2, AMOUNT: 3 }
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
