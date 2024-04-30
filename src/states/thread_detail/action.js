import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  addThreadComment,
  downVoteComment,
  downVoteThread,
  getThread,
  neutralizeVoteThread,
  upVoteComment,
  upVoteThread,
} from '../../utils/network-api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_THREAD_DETAIL_LIKE: 'TOGGLE_THREAD_DETAIL_LIKE',
  TOGGLE_THREAD_DETAIL_DISLIKE: 'TOGGLE_THREAD_DETAIL_DISLIKE',
  ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
  TOGGLE_THREAD_COMMENT_LIKE: 'TOGGLE_THREAD_COMMENT_LIKE',
  TOGGLE_THREAD_COMMENT_DISLIKE: 'TOGGLE_THREAD_COMMENT_DISLIKE',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
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
      comment,
    },
  };
}

function toggleThreadDetailLikeActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_THREAD_DETAIL_LIKE,
    payload: {
      userId,
    },
  };
}

function toggleThreadDetailDislikeActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_THREAD_DETAIL_DISLIKE,
    payload: {
      userId,
    },
  };
}

function toggleThreadDetailCommentLikeActionCreator({
  threadId,
  commentId,
  userId,
}) {
  return {
    type: ActionType.TOGGLE_THREAD_COMMENT_LIKE,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleThreadDetailCommentDislikeActionCreator({
  threadId,
  commentId,
  userId,
}) {
  return {
    type: ActionType.TOGGLE_THREAD_COMMENT_DISLIKE,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await getThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (err) {
      alert(err.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddThreadDetailComment(threadId, commentBody) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await addThreadComment(threadId, commentBody);
      dispatch(addThreadDetailCommentActionCreator(comment));
    } catch (e) {
      alert(e.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleThreadDetailLike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      const run = threadDetail.upVotesBy.includes(authUser.id) ? 0 : 1;
      dispatch(showLoading());

      try {
        dispatch(toggleThreadDetailLikeActionCreator(authUser.id));
        if (run === 0) {
          await neutralizeVoteThread(threadId);
        } else {
          await upVoteThread(threadId);
        }
      } catch (e) {
        dispatch(toggleThreadDetailLikeActionCreator(authUser.id));
      }

      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadDetailDislike(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      const run = threadDetail.downVotesBy.includes(authUser.id) ? 1 : 2;

      dispatch(showLoading());

      try {
        dispatch(toggleThreadDetailDislikeActionCreator(authUser.id));
        if (run === 1) {
          await neutralizeVoteThread(threadId);
        } else {
          await downVoteThread(threadId);
        }
      } catch (e) {
        dispatch(toggleThreadDetailDislikeActionCreator(authUser.id));
      }

      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadDetailCommentLike(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      dispatch(
        toggleThreadDetailCommentLikeActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(showLoading());

      try {
        await upVoteComment(threadId, commentId);
      } catch (e) {
        dispatch(
          toggleThreadDetailCommentLikeActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          }),
        );
      }

      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadDetailCommentDislike(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (authUser === null) {
      alert('Please login first.');
    } else {
      dispatch(
        toggleThreadDetailCommentDislikeActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
      dispatch(showLoading());

      try {
        await downVoteComment(threadId, commentId);
      } catch (e) {
        dispatch(
          toggleThreadDetailCommentDislikeActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          }),
        );
      }

      dispatch(hideLoading());
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
