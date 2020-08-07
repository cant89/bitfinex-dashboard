import { ACTION_TYPES } from '../../constants/app';

export type TAppInitialState = {
  offline: boolean;
};

export const initialAppState: TAppInitialState = {
  offline: false
};

const app = (
  state: TAppInitialState = initialAppState,
  { type, payload }: any
) => {
  if (type === ACTION_TYPES.CONNECTION_LOST) {
    return {
      ...state,
      offline: true
    };
  }

  if (type === ACTION_TYPES.CONNECTION_RESTORED) {
    return {
      ...state,
      offline: false
    };
  }

  return state;
};

export default {
  app
};
