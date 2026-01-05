import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    authUser: authUserReducer,
    threadDetail: threadDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }),
});

export default store;
