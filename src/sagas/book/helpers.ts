import {
  bookWsInfo,
  bookWsSubscribed,
  bookWsSnapshot,
  bookWsMessage
} from '../../actions/book';
import { connectionLost } from '../../actions/app';
import { ERR_CONNECTION_LOST } from '../../services/ws';

const formatBookOrder = (trade: any) => {
  const [PRICE, COUNT, AMOUNT] = trade;
  return {
    PRICE,
    COUNT,
    AMOUNT
  };
};

type TBookActions =
  | typeof bookWsInfo
  | typeof bookWsSubscribed
  | typeof bookWsSnapshot
  | typeof bookWsMessage
  | typeof connectionLost;

type TActionByMessage = (
  message: any
) => { action?: TBookActions; payload?: any } | undefined;

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
      action: bookWsInfo,
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
      action: bookWsSubscribed
    };
  }

  return;
};

const isBookSnapshot: TActionByMessage = message => {
  if (message.length === 2) {
    const [, data] = message;
    const isSnapshot = Array.isArray(data[0]);

    if (isSnapshot) {
      return {
        action: bookWsSnapshot,
        payload: data.map(formatBookOrder)
      };
    }
  }

  return;
};

const isBookMessage: TActionByMessage = message => {
  if (message.length === 2) {
    const [, data] = message;
    const isMessage = !Array.isArray(data[0]);

    if (isMessage) {
      return {
        action: bookWsMessage,
        payload: formatBookOrder(data)
      };
    }
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
  isBookSnapshot,
  isBookMessage,
  isConnectionLost
};

type TGetActionByMessage = (
  message: any
) => { action?: TBookActions; payload?: any };

const getActionByMessage: TGetActionByMessage = message => {
  const action = Object.keys(actionsByMessage).reduce((acc, type) => {
    return acc || actionsByMessage[type](message);
  }, undefined);

  return action || {};
};

export { getActionByMessage };
