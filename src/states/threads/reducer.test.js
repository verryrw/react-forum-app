import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import {
  addThreadActionCreator,
  receiveThreadsActionCreator,
  toggleThreadDislikeActionCreator,
  toggleThreadLikeActionCreator,
} from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by UNKNOWN action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the received threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = receiveThreadsActionCreator([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return threads with new item when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread tambahan',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 4,
    };
    const action = addThreadActionCreator(newThread);

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([...initialState, newThread]);
  });

  it('should return threads with a toggled like thread when given by TOGGLE_LIKE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = toggleThreadLikeActionCreator('thread-1', 'user-3');

    // action: like thread
    const nextState = threadsReducer(initialState, action);

    // assert
    const expectedLikedState = initialState.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: [...thread.upVotesBy, action.payload.userId],
        };
      }
      return thread;
    });
    expect(nextState).toEqual(expectedLikedState);

    // action: unlike thread
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return threads with a toggled dislike thread when given by TOGGLE_DISLIKE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = toggleThreadDislikeActionCreator('thread-1', 'user-3');

    // action: like thread
    const nextState = threadsReducer(initialState, action);

    // assert
    const expectedDislikedState = initialState.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          downVotesBy: [...thread.downVotesBy, action.payload.userId],
        };
      }
      return thread;
    });
    expect(nextState).toEqual(expectedDislikedState);

    // action: unlike thread
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
