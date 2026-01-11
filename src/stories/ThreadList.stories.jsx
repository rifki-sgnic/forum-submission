import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadList from '../components/ThreadList';
import { mockThreads } from '../utils/mockData';
import authUserReducer from '../states/authUser/reducer';
import notificationReducer from '../states/notification/reducer';
import threadsReducer from '../states/threads/reducer';

const threads = mockThreads.map((thread) => ({
  ...thread,
  user: {
    id: thread.ownerId || 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
}));

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
  title: 'Components/ThreadList',
  component: ThreadList,
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
    threads,
    loading: false,
    authUser: null,
  },
};

export const Loading = {
  args: {
    threads: [],
    loading: true,
    authUser: null,
  },
};

export const Empty = {
  args: {
    threads: [],
    loading: false,
    authUser: null,
  },
};
