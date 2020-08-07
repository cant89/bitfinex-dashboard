import { action } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { ACTION_TYPES } from '../../constants/app';

export const connectionLost = (): AnyAction =>
  action(ACTION_TYPES.CONNECTION_LOST);

export const connectionRestored = (): AnyAction =>
  action(ACTION_TYPES.CONNECTION_RESTORED);
