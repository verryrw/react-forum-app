import { getThread } from "../../utils/network-api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  TOGGLE_THREAD_LIKE: "TOGGLE_THREAD_LIKE",
  TOGGLE_THREAD_DISLIKE: "TOGGLE_THREAD_DISLIKE",
  ADD_THREAD_COMMENT: "ADD_THREAD_COMMENT",
  TOGGLE_THREAD_COMMENT_LIKE: "TOGGLE_THREAD_COMMENT_LIKE",
  TOGGLE_THREAD_COMMENT_DISLIKE: "TOGGLE_THREAD_COMMENT_DISLIKE",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail: threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
    payload: {
      thread: null,
    },
  };
}

function toggleThreadLikeActionCreator(isLike) {
  return {
    type: ActionType,
    payload: {
      isLike: isLike,
    },
  };
}

function addThreadCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_THREAD_COMMENT,
    payload: {
      comment: comment,
    },
  };
}

function asyncAddThreadComment(commentBody) {
  return async (dispatch) {
    try {
      dispatch();
    } catch(e) {
      alert(e.message);
    }
  }
}

function asyncGetThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      const threadDetail = await getThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (err) {
      alert(err.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleThreadLikeActionCreator,
  asyncGetThreadDetail,
};
