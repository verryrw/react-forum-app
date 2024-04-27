import { getLeaderboards } from "../../utils/network-api";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards: leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (e) {
      alert(e.message);
    }
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
