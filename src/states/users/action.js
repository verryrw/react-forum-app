import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/network-api';
import { asyncSetAuthUser } from '../auth_user/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegister({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
      dispatch(asyncSetAuthUser(email, password));
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegister };
