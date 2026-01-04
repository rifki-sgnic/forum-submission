import { configureStore } from "@reduxjs/toolkit";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    users: usersReducer,
  },
});

export default store;
