import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { putAccessToken } from '../../utils/local-api';
import api from '../../utils/network-api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser(email, password) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = await api.login(email, password);
      putAccessToken(token);
      const authUser = await api.getUserLogged(token);
      dispatch(setAuthUserActionCreator(authUser));
    } catch (e) {
      alert(e.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    putAccessToken('');
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
