import { ActionType } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.TOGGLE_THREAD_DETAIL_LIKE: {
      const upVotesBy = threadDetail.upVotesBy;
      const userId = action.payload.userId;
      const isLiked = upVotesBy.includes(userId);

      return {
        ...threadDetail,
        upVotesBy: isLiked
          ? upVotesBy.filter((downVoteUserId) => downVoteUserId !== userId)
          : [...upVotesBy, userId],
        downVotesBy: threadDetail.downVotesBy.filter(
          (downVoteUserId) => downVoteUserId !== userId
        ),
      };
    }
    case ActionType.TOGGLE_THREAD_DETAIL_DISLIKE: {
      const downVotesBy = threadDetail.downVotesBy;
      const userId = action.payload.userId;
      const isDisliked = downVotesBy.includes(userId);

      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (upVoteUserId) => upVoteUserId !== userId
        ),
        downVotesBy: isDisliked
          ? downVotesBy.filter((downVoteUserId) => downVoteUserId !== userId)
          : [...downVotesBy, userId],
      };
    }
    case ActionType.TOGGLE_THREAD_COMMENT_LIKE: {
      const comments = threadDetail.comments;
      const targetCommentId = action.payload.commentId;
      const userId = action.payload.userId;
      const isCommentLiked = comments
        .find((comment) => comment.id === targetCommentId)
        .upVotesBy.includes(userId);
      const commentsLiked = () =>
        comments.map((comment) => {
          if (comment.id === targetCommentId) {
            return { ...comment, upVotesBy: [...comment.upVotesBy, userId] };
          }

          return comment;
        });
      const commentsNeutralized = () =>
        comments.map((comment) => {
          if (comment.id === targetCommentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (upVoteUserId) => upVoteUserId !== userId
              ),
            };
          }

          return comment;
        });

      return {
        ...threadDetail,
        comments: isCommentLiked ? commentsNeutralized() : commentsLiked(),
      };
    }
    case ActionType.TOGGLE_THREAD_COMMENT_DISLIKE: {
      const comments = threadDetail.comments;
      const targetCommentId = action.payload.commentId;
      const userId = action.payload.userId;
      const isCommentDisliked = comments
        .find((comment) => comment.id === targetCommentId)
        .downVotesBy.includes(userId);
      const commentsDisliked = () =>
        comments.map((comment) => {
          if (comment.id === targetCommentId) {
            return {
              ...comment,
              downVotesBy: [...comment.downVotesBy, userId],
            };
          }

          return comment;
        });
      const commentsNeutralized = () =>
        comments.map((comment) => {
          if (comment.id === targetCommentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.filter(
                (upVoteUserId) => upVoteUserId !== userId
              ),
            };
          }

          return comment;
        });

      return {
        ...threadDetail,
        comments: isCommentDisliked
          ? commentsNeutralized()
          : commentsDisliked(),
      };
    }
    case ActionType.ADD_THREAD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
