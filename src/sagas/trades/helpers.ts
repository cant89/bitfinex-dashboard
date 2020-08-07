import {
  tradesWsInfo,
  tradesWsSubscribed,
  tradesWsSnapshot,
  tradesWsMessage
} from '../../actions/trades';
import { connectionLost } from '../../actions/app';
import { ERR_CONNECTION_LOST } from '../../services/ws';

const formatTrade = (trade: any) => {
  const [ID, MTS, AMOUNT, PRICE] = trade;
  return {
    ID,
    MTS,
    AMOUNT,
    PRICE
  };
};

type TTradesActions =
  | typeof tradesWsInfo
  | typeof tradesWsSubscribed
  | typeof tradesWsSnapshot
  | typeof tradesWsMessage
  | typeof connectionLost;

type TActionByMessage = (
  message: any
) => { action?: TTradesActions; payload?: any } | undefined;

const isPong: TActionByMessage = message => {
  if (message.event === 'pong') {
    return {};
  }

  return;
};

const isHearthBeat: TActionByMessage = message => {
  if (message[1] === 'hb') {
    return {};
  }

  return;
};

const isInfo: TActionByMessage = message => {
  if (message.event === 'info') {
    return {
      action: tradesWsInfo,
      payload: {
        serverId: message.serverId
      }
    };
  }

  return;
};

const isSubscribed: TActionByMessage = message => {
  if (message.event === 'subscribed') {
    return {
      action: tradesWsSubscribed
    };
  }

  return;
};

const isTradesSnapshot: TActionByMessage = message => {
  if (message.length === 2) {
    const [, trades] = message;
    return {
      action: tradesWsSnapshot,
      payload: trades.map(formatTrade)
    };
  }

  return;
};

const isTradeMessage: TActionByMessage = message => {
  if (message.length === 3) {
    const [, updateType, trade] = message;

    return {
      action: tradesWsMessage,
      payload: {
        updateType,
        trade: formatTrade(trade)
      }
    };
  }

  return;
};

const isConnectionLost: TActionByMessage = message => {
  if (message.event === ERR_CONNECTION_LOST) {
    return {
      action: connectionLost
    };
  }

  return;
};

const actionsByMessage = {
  isPong,
  isHearthBeat,
  isInfo,
  isSubscribed,
  isTradesSnapshot,
  isTradeMessage,
  isConnectionLost
};

type TGetActionByMessage = (
  message: any
) => { action?: TTradesActions; payload?: any };

const getActionByMessage: TGetActionByMessage = message => {
  const action = Object.keys(actionsByMessage).reduce((acc, type) => {
    return acc || actionsByMessage[type](message);
  }, undefined);

  return action || {};
};

export { getActionByMessage };
