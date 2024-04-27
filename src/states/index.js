import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "./auth_user/reducer";
import { isPreloadReducer } from "./is_preload/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";
import threadDetailReducer from "./thread_detail/reducer";
import leaderboardsReducer from "./leaderboards/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
