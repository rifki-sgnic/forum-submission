import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../components/ThreadItem';
import { mockThreads } from '../utils/mockData';
import authUserReducer from '../states/authUser/reducer';
import notificationReducer from '../states/notification/reducer';
import threadsReducer from '../states/threads/reducer';

const thread = {
  ...mockThreads[0],
  user: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  createdAt: '2026-01-04T07:00:00.000Z',
};

// Mock Store
const createMockStore = (authState = null) =>
  configureStore({
    reducer: {
      authUser: authUserReducer,
      notif: notificationReducer,
      threads: threadsReducer,
    },
    preloadedState: {
      authUser: authState,
    },
  });

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
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
    ...thread,
    authUser: null,
  },
};

export const Upvoted = {
  args: {
    ...thread,
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
    ...thread,
    downVotesBy: ['users-1'],
    authUser: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

export const LongBody = {
  args: {
    ...mockThreads[2],
    user: {
      id: 'users-3',
      name: 'Developer',
      avatar: 'https://generated-image-url.jpg',
    },
    authUser: null,
  },
};
