import { putAccessToken } from "../../utils/local-api";
import { getUserLogged, login } from "../../utils/network-api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser: authUser,
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
    try {
      const token = await login(email, password);
      putAccessToken(token);
      const authUser = await getUserLogged(token);
      dispatch(setAuthUserActionCreator(authUser));
    } catch (e) {
      alert(e.message);
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
};
