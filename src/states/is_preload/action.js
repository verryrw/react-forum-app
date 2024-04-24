import { getUserLogged } from "../../utils/network-api";
import { asyncSetAuthUser } from "../auth_user/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload: isPreload,
    },
  };
}

function asyncSetIsPreload() {
  return async (dispatch) => {
    try {
      dispatch(setIsPreloadActionCreator(true));
      dispatch(asyncSetAuthUser());
    } catch (e) {
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export {};
