import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadDetail from '../components/ThreadDetail';
import { detailThread } from '../utils/mockData';
import authUserReducer from '../states/authUser/reducer';
import notificationReducer from '../states/notification/reducer';
import threadDetailReducer from '../states/threadDetail/reducer';

// Mock Store
const createMockStore = (authState = null) =>
  configureStore({
    reducer: {
      authUser: authUserReducer,
      notif: notificationReducer,
      threadDetail: threadDetailReducer,
    },
    preloadedState: {
      authUser: authState,
    },
  });

export default {
  title: 'Components/ThreadDetail',
  component: ThreadDetail,
  decorators: [
    (Story, context) => {
      const store = createMockStore(context.args.authUser);
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Provider>
      );
    },
  ],
  tags: ['autodocs'],
};

export const Default = {
  args: {
    ...detailThread,
    authUser: null,
  },
};

export const Upvoted = {
  args: {
    ...detailThread,
    upVotesBy: ['users-1'],
    authUser: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

export const Downvoted = {
  args: {
    ...detailThread,
    downVotesBy: ['users-1'],
    authUser: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};
