import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';

describe('authUserReducer function', () => {
  it('should return initial state when given by UNKNOWN action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authed user when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = setAuthUserActionCreator({
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    });

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    const action = unsetAuthUserActionCreator();

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
