import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import commentsReducer from './comment/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import loadingReducer from './loading/reducer';
import notificationReducer from './notification/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    authUser: authUserReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
    leaderboards: leaderboardsReducer,
    loading: loadingReducer,
    notif: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }),
});

export default store;
