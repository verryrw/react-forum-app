import { getThreads, getUsers } from "../../utils/network-api";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const threads = await getThreads();
      const users = await getUsers();
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (e) {
      alert(e.message);
    }
  };
}

export { asyncPopulateUsersAndThreads };
