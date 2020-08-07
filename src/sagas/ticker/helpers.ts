import {
  tickerWsInfo,
  tickerWsSubscribed,
  tickerWsMessage
} from '../../actions/ticker';
import { connectionLost } from '../../actions/app';
import { ERR_CONNECTION_LOST } from '../../services/ws';

type TTickerActions =
  | typeof tickerWsInfo
  | typeof tickerWsSubscribed
  | typeof tickerWsMessage
  | typeof connectionLost;

type TActionByMessage = (
  message: any
) => { action?: TTickerActions; payload?: any } | undefined;

const formatTickerMessage = (message: any) => {
  const [
    ,
    [
      BID,
      BID_SIZE,
      ASK,
      ASK_SIZE,
      DAILY_CHANGE,
      DAILY_CHANGE_RELATIVE,
      LAST_PRICE,
      VOLUME,
      HIGH,
      LOW
    ]
  ] = message;

  return {
    BID,
    BID_SIZE,
    ASK,
    ASK_SIZE,
    DAILY_CHANGE,
    DAILY_CHANGE_RELATIVE,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW
  };
};

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
      action: tickerWsInfo,
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
      action: tickerWsSubscribed
    };
  }

  return;
};

const isTickerMessage: TActionByMessage = message => {
  if (message.length === 2) {
    return {
      action: tickerWsMessage,
      payload: formatTickerMessage(message)
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
  isTickerMessage,
  isConnectionLost
};

type TGetActionByMessage = (
  message: any
) => { action?: TTickerActions; payload?: any };

const getActionByMessage: TGetActionByMessage = message => {
  const action = Object.keys(actionsByMessage).reduce((acc, type) => {
    return acc || actionsByMessage[type](message);
  }, undefined);

  return action || {};
};

export { getActionByMessage };
