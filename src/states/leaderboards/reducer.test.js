import { describe, expect, it } from 'vitest';
import leaderboardsReducer from './reducer';
import { receiveLeaderboardsActionCreator } from './action';

describe('leaderboardsReducer function', () => {
  it('should return initial state if given by UNKNOWN action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards if given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = receiveLeaderboardsActionCreator([
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ]);

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
