import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    users: usersReducer,
    authUser: authUserReducer,
  },
});

export default store;
