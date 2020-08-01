import { eventChannel } from 'redux-saga';

type TSubscribeMsg = {
  event: string;
  channel: string;
  symbol: string;
};

const createChannel = (subscribeMsg: TSubscribeMsg) => (emitter: any) => {
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
  let pingTimeout: number, pingInterval: number;

  function reloadChannel() {
    console.log('reloading channel...');
    createChannel(subscribeMsg)(emitter);
  }

  function ping() {
    ws.send(
      JSON.stringify({
        event: 'ping',
        cid: 1234
      })
    );

    pingTimeout = window.setTimeout(reloadChannel, 5000);
  }

  ws.onmessage = msg => {
    const data = JSON.parse(msg.data);

    if (data.event === 'pong') {
      clearTimeout(pingTimeout);
      return;
    }

    if (['info', 'subscribed'].includes(data.event) || data[1] === 'hb') {
      return;
    }
    return emitter(data);
  };

  ws.onopen = () => {
    console.log('opening ws...');
    pingInterval = window.setInterval(ping, 5000);
    ws.send(JSON.stringify(subscribeMsg));
  };

  ws.onerror = err => {
    setTimeout(reloadChannel, 5000);
    console.log(err);
  };

  return () => {
    console.log('ws closed');
    ws.close();
    clearInterval(pingInterval);
  };
};

export const openWs = (subscribeMsg: TSubscribeMsg): any => {
  return eventChannel(createChannel(subscribeMsg));
};
