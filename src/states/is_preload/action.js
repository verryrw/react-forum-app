import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/network-api';
import { setAuthUserActionCreator } from '../auth_user/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncSetIsPreload() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      dispatch(setIsPreloadActionCreator(true));
      const user = await api.getUserLogged();
      dispatch(setAuthUserActionCreator(user));
    } catch (e) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadActionCreator, asyncSetIsPreload };
