declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  __INITIAL_STATE__: any;
}

declare const API_BASE_URL: {
  BITFINEX_PUBLIC_WS: string;
};

declare module '*.svg' {
  const content: string;
  export default content;
}

declare type valueof<T> = T[keyof T];
