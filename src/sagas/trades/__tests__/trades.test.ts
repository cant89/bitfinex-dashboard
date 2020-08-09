import { getActionByMessage } from '../helpers';
import {
  tradesWsInfo,
  tradesWsSubscribed,
  tradesWsMessage,
  tradesWsSnapshot
} from '../../../actions/trades';
import { ERR_CONNECTION_LOST } from '../../../services/ws';
import { connectionLost } from '../../../actions/app';

describe('Trades Saga Helper', () => {
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
      action: tradesWsInfo,
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
      action: tradesWsSubscribed
    });
  });

  it('getActionByMessage should return proper object when message is of isTradesSnapshot', () => {
    const result = getActionByMessage([
      123,
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8]
      ]
    ]);
    expect(result).toEqual({
      action: tradesWsSnapshot,
      payload: [
        { ID: 1, MTS: 2, AMOUNT: 3, PRICE: 4 },
        { ID: 5, MTS: 6, AMOUNT: 7, PRICE: 8 }
      ]
    });
  });

  it('getActionByMessage should return proper object when message is of isTradesMessage', () => {
    const result = getActionByMessage([123, 'tu', [1, 2, 3, 4]]);
    expect(result).toEqual({
      action: tradesWsMessage,
      payload: {
        updateType: 'tu',
        trade: {
          ID: 1,
          MTS: 2,
          AMOUNT: 3,
          PRICE: 4
        }
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
