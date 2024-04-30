import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getThreads, getUsers } from '../../utils/network-api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await getThreads();
      const users = await getUsers();
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;
