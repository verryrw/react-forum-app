const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  TOGGLE_THREAD_LIKE: "TOGGLE_THREAD_LIKE",
  TOGGLE_THREAD_LIKE: "TOGGLE_THREAD_LIKE",
  TOGGLE_THREAD_DISLIKE: "TOGGLE_THREAD_DISLIKE",
  ADD_THREAD_COMMENT: "ADD_THREAD_COMMENT",
  TOGGLE_THREAD_COMMENT_LIKE: "TOGGLE_THREAD_COMMENT_LIKE",
  TOGGLE_THREAD_COMMENT_DISLIKE: "TOGGLE_THREAD_COMMENT_DISLIKE",
};

function receiveThreadDetail(thread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      thread: thread,
    },
  };
}

function clearThreadDetail(thread) {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
    payload: {
      thread: null,
    },
  };
}

function toggleThreadLike(isLike) {
  return {
    type: ActionType,
  };
}

export { ActionType, receiveThreadDetail };
