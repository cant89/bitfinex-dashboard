import { eventChannel, EventChannel } from 'redux-saga';

type TSubscribeMsg = {
  event: string;
  channel: string;
  symbol: string;
};

const PING_PAYLOAD = JSON.stringify({
  event: 'ping',
  cid: 1234
});

export const ERR_CONNECTION_LOST = 'ERR_CONNECTION_LOST';

const createChannel = (subscribeMsg: TSubscribeMsg) => (
  emit: (data: any) => void
) => {
  let ws: WebSocket;
  let pingTimeout: number;
  let pingInterval: number;

  function init() {
    ws = new WebSocket(API_BASE_URL.BITFINEX_PUBLIC_WS);

    function onConnectionLost() {
      emit({ event: ERR_CONNECTION_LOST });
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

      return emit(data);
    }

    function onOpen() {
      pingInterval = window.setInterval(() => ping(), 10000);
      ws.send(JSON.stringify(subscribeMsg));
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

export const openWs = (
  subscribeMsg: TSubscribeMsg
): EventChannel<WebSocket> => {
  return eventChannel(createChannel(subscribeMsg));
};
