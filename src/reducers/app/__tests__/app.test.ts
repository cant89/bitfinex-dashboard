import reducers, { initialAppState } from '../';
import { ACTION_TYPES } from '../../../constants/app';

describe('App Reducers', () => {
  it('should return the proper state when the action is CONNECTION_LOST', () => {
    const result = reducers.app(initialAppState, {
      type: ACTION_TYPES.CONNECTION_LOST
    });

    expect(result).toEqual({
      ...initialAppState,
      offline: true
    });
  });

  it('should return the proper state when the action is CONNECTION_RESTORED', () => {
    const result = reducers.app(initialAppState, {
      type: ACTION_TYPES.CONNECTION_RESTORED
    });

    expect(result).toEqual({
      ...initialAppState,
      offline: false
    });
  });
});
