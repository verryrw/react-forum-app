import { useNavigate } from "react-router-dom";
import {
  addThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from "../../utils/network-api";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  TOGGLE_LIKE_THREAD: "TOGGLE_LIKE_THREAD",
  TOGGLE_DISLIKE_THREAD: "TOGGLE_DISLIKE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads: threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread: thread,
    },
  };
}

function toggleThreadLikeActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId: threadId,
      userId: userId,
    },
  };
}

function toggleThreadDislikeActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId: threadId,
      userId: userId,
    },
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    try {
      const response = await addThread({ title, category, body });
      dispatch(addThreadActionCreator(response));
    } catch (e) {
      alert(e.message);
    }
  };
}

function asyncToggleThreadLike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(toggleThreadLikeActionCreator(threadId, authUser.id));
    try {
      const thread = threads.find((thread) => thread.id === threadId);
      if (thread.upVotesBy.includes(authUser.id)) {
        await neutralizeVoteThread(threadId);
      } else {
        await upVoteThread(threadId);
      }
    } catch (e) {
      dispatch(toggleThreadLikeActionCreator(threadId, authUser.id));
      alert(e.message);
    }
  };
}

function asyncToggleThreadDislike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(toggleThreadDislikeActionCreator(threadId, authUser.id));
    try {
      const thread = threads.find((thread) => thread.id === threadId);
      if (thread.downVotesBy.includes(authUser.id)) {
        await neutralizeVoteThread(threadId);
      } else {
        await downVoteThread(threadId);
      }
    } catch (e) {
      dispatch(toggleThreadDislikeActionCreator(threadId, authUser.id));
      alert(e.message);
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
