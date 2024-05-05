import { describe, expect, it } from 'vitest';
import { setIsPreloadActionCreator } from './action';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return initial state if given by UNKNOWN action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the isPreload if given by SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = setIsPreloadActionCreator(false);

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
