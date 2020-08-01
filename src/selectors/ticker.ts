import { TReduxState } from '#/types';

export const getTickerSelector = (state: TReduxState) => state.ticker;
