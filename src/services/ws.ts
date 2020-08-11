import {
  eventChannel,
  EventChannel,
  channel,
  TakeableChannel
} from 'redux-saga';
import { take } from 'redux-saga/effects';

type TSubscribeMsg = {
  event: string;
  channel: string;
  symbol: string;
};

const WS_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

const PING_PAYLOAD = JSON.stringify({
  event: 'ping',
  cid: 1234
});

export const ERR_CONNECTION_LOST = 'ERR_CONNECTION_LOST';

type TOpenedWsChannel = {
  channel?: EventChannel<WebSocket>;
  ws?: WebSocket;
  subscriptions: number;
};
type TOPENED_WS_CHANNELS = TOpenedWsChannel[];

const OPENED_WS_CHANNELS: TOPENED_WS_CHANNELS = [];

const createChannel = (subscribeMsg: TSubscribeMsg) => (
  emit: (data: any) => void
) => {
  let ws: WebSocket;
  let pingTimeout: number;
  let pingInterval: number;
  let channelIndex: number;

  const multipleEmitter = data => {
    for (let n = 0; n < OPENED_WS_CHANNELS[channelIndex].subscriptions; n++) {
      emit(data);
    }
  };

  function init() {
    ws = new WebSocket(API_BASE_URL.BITFINEX_PUBLIC_WS);

    channelIndex =
      OPENED_WS_CHANNELS.push({
        ws,
        subscriptions: 1
      }) - 1;

    function onConnectionLost() {
      multipleEmitter({ event: ERR_CONNECTION_LOST });
      ws.close();
      clearInterval(pingInterval);
      init();
    }

    function ping() {
      ws.send(PING_PAYLOAD);
      pingTimeout = window.setTimeout(() => onConnectionLost(), 5000);
    }

    function onMessage(msg: any) {
      const data = JSON.parse(msg.data);
      const { event } = data;

      if (event === 'pong') {
        clearTimeout(pingTimeout);
      }

      return multipleEmitter(data);
    }

    function onOpen() {
      pingInterval = window.setInterval(() => ping(), 10000);
      ws.send(JSON.stringify(subscribeMsg));
      console.log('opened...');
      multipleEmitter({ event: 'OPENED' });
    }

    function onClose() {
      /* eslint-disable no-console */
      console.log('close');
    }

    function onError(err: any) {
      /* eslint-disable no-console */
      console.error(err);
      window.setTimeout(() => init(), 5000);
    }

    ws.onmessage = onMessage;
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onerror = onError;
  }

  init();

  return () => {
    ws.close();
    clearInterval(pingInterval);
  };
};

function* useAvailableChannel() {}

export function* openWs(subscribeMsg: TSubscribeMsg) {
  const availableChannel = OPENED_WS_CHANNELS.reduce(
    (
      firstAvailableChannel: (TOpenedWsChannel & { index: number }) | undefined,
      channel: TOpenedWsChannel,
      index
    ) => {
      return firstAvailableChannel || channel.subscriptions <= 30
        ? { ...channel, index }
        : undefined;
    },
    undefined
  );

  if (availableChannel && availableChannel.ws && availableChannel.channel) {
    const { ws, index, channel } = availableChannel;
    console.log('availableChannel used...', ws.readyState);

    OPENED_WS_CHANNELS[index].subscriptions += 1;

    if (ws.readyState === WS_STATES.OPEN) {
      ws.send(JSON.stringify(subscribeMsg));
    }

    if (ws.readyState === WS_STATES.CONNECTING) {
      console.log('CONNECTING...', OPENED_WS_CHANNELS);

      while (true) {
        const message = yield take(availableChannel.channel);
        console.log('CONNECTING...', message);
        debugger;
        if (message.event === 'OPENED') {
          ws.send(JSON.stringify(subscribeMsg));
          break;
        }
      }
    }

    return channel;
  }

  const { length: newChannelIndex } = OPENED_WS_CHANNELS;

  const newChannel = eventChannel(createChannel(subscribeMsg));

  console.log('newChannel created...');

  OPENED_WS_CHANNELS[newChannelIndex].channel = newChannel;

  return newChannel;
}

/*
1. in ws.ts store in array of objs the WS witho n of opened connections
2. in ws.ts emit subscribe
3. in each saga helpers: add to each condition a check for channel name OR channel id
*/
