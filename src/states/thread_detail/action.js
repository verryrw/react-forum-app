import {
  addThreadComment,
  getThread,
  upVoteThread,
} from "../../utils/network-api";

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

function addThreadDetailCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_THREAD_COMMENT,
    payload: {
      comment: comment,
    },
  };
}

function toggleThreadDetailLikeActionCreator(threadId, userId) {
  return {
    type: ActionType,
    payload: {
      threadId: threadId,
      userId: userId,
    },
  };
}

function toggleThreadDetailDislikeActionCreator(threadId, userId) {
  return {
    type: ActionType,
    payload: {
      threadId: threadId,
      userId: userId,
    },
  };
}

function toggleThreadDetailCommentLikeActionCreator({
  threadId,
  commentId,
  userId,
}) {
  return {
    type: ActionType,
    payload: {
      threadId: threadId,
      commentId: commentId,
      userId: userId,
    },
  };
}

function toggleThreadDetailCommentDislikeActionCreator({
  threadId,
  commentId,
  userId,
}) {
  return {
    type: ActionType,
    payload: {
      threadId: threadId,
      commentId: commentId,
      userId: userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      const threadDetail = await getThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncAddThreadDetailComment(threadId, commentBody) {
  return async (dispatch) => {
    try {
      const comment = await addThreadComment(threadId, commentBody);
      dispatch(addThreadDetailCommentActionCreator(comment));
    } catch (e) {
      alert(e.message);
    }
  };
}

function asyncToggleThreadDetailLike(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleThreadDetailLikeActionCreator(threadId, authUser.id));
    try {
      await upVoteThread(threadId);
    } catch (e) {
      dispatch(toggleThreadDetailLikeActionCreator(threadId, authUser.id));
    }
  };
}

function asyncToggleThreadDetailDislike(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleThreadDetailDislikeActionCreator(threadId, authUser.id));
    try {
      await upVoteThread(threadId);
    } catch (e) {
      dispatch(toggleThreadDetailDislikeActionCreator(threadId, authUser.id));
    }
  };
}

function asyncToggleThreadDetailCommentLike(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleThreadDetailCommentLikeActionCreator({
        threadId: threadId,
        commentId: commentId,
        userId: authUser.id,
      })
    );
    try {
      await upVoteThread(threadId);
    } catch (e) {
      dispatch(
        toggleThreadDetailCommentLikeActionCreator({
          threadId: threadId,
          commentId: commentId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleThreadDetailCommentDislike(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleThreadDetailCommentDislikeActionCreator({
        threadId: threadId,
        commentId: commentId,
        userId: authUser.id,
      })
    );
    try {
      await upVoteThread(threadId);
    } catch (e) {
      dispatch(
        toggleThreadDetailCommentDislikeActionCreator({
          threadId: threadId,
          commentId: commentId,
          userId: authUser.id,
        })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleThreadDetailLikeActionCreator,
  asyncReceiveThreadDetail,
  asyncAddThreadDetailComment,
  asyncToggleThreadDetailLike,
  asyncToggleThreadDetailDislike,
  asyncToggleThreadDetailCommentLike,
  asyncToggleThreadDetailCommentDislike,
};
