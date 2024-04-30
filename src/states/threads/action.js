import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  addThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from '../../utils/network-api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleThreadLikeActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleThreadDislikeActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await addThread({ title, category, body });
      dispatch(addThreadActionCreator(response));
      alert('Successfully added thread');
    } catch (e) {
      alert(e.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleThreadLike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      const thread = threads.find((threadItem) => threadItem.id === threadId);
      const run = thread.upVotesBy.includes(authUser.id) ? 1 : 2;

      dispatch(showLoading());

      try {
        dispatch(toggleThreadLikeActionCreator(threadId, authUser.id));
        if (run === 1) {
          await neutralizeVoteThread(threadId);
        } else {
          await upVoteThread(threadId);
        }
      } catch (e) {
        dispatch(toggleThreadLikeActionCreator(threadId, authUser.id));
        alert(e.message);
      }

      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadDislike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      dispatch(toggleThreadDislikeActionCreator(threadId, authUser.id));
      dispatch(showLoading());

      try {
        const thread = threads.find((threadItem) => threadItem.id === threadId);
        if (thread.downVotesBy.includes(authUser.id)) {
          await neutralizeVoteThread(threadId);
        } else {
          await downVoteThread(threadId);
        }
      } catch (e) {
        dispatch(toggleThreadDislikeActionCreator(threadId, authUser.id));
        alert(e.message);
      }

      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleThreadLikeActionCreator,
  toggleThreadDislikeActionCreator,
  asyncAddThread,
  asyncToggleThreadLike,
  asyncToggleThreadDislike,
};
