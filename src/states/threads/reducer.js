import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread];
    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter(
                  (upVoteUserId) => upVoteUserId !== action.payload.userId
                )
              : [thread.upVotesBy, action.payload.userId],
          };
        }

        return thread;
      });
    case ActionType.TOGGLE_DISLIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter(
                  (downVoteUserId) => downVoteUserId !== action.payload.userId
                )
              : [thread.downVotesBy, action.payload.userId],
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
