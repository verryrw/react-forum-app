import { ActionType } from "./action";

function threadDetailReducer(threadDetail = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.TOGGLE_THREAD_LIKE:
      return threadDetail;
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
