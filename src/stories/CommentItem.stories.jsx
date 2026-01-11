import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from '../components/CommentItem';
import { detailThread } from '../utils/mockData';
import authUserReducer from '../states/authUser/reducer';
import notificationReducer from '../states/notification/reducer';
import commentReducer from '../states/comment/reducer';

const comment = detailThread.comments[0];

// Mock Store
const createMockStore = (authState = null) =>
  configureStore({
    reducer: {
      authUser: authUserReducer,
      notif: notificationReducer,
      comment: commentReducer,
    },
    preloadedState: {
      authUser: authState,
    },
  });

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
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
    comment,
    authUser: null,
  },
};

export const Upvoted = {
  args: {
    comment: {
      ...comment,
      upVotesBy: ['users-1'],
    },
    authUser: {
      id: 'users-1',
      name: 'John Doe',
    },
  },
};

export const Downvoted = {
  args: {
    comment: {
      ...comment,
      downVotesBy: ['users-1'],
    },
    authUser: {
      id: 'users-1',
      name: 'John Doe',
    },
  },
};
