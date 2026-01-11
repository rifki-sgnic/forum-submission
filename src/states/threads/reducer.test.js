/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD action
 *  - should return the threads with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD action
 *  - should return the threads with the toggled neutral vote thread when given by TOGGLE_NEUTRAL_VOTE_THREAD action
 *
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread 1',
            body: 'Body 1',
            category: 'Category 1',
            createdAt: '2022-01-01T00:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    const initialState = [];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread 1',
          body: 'Body 1',
          category: 'Category 1',
          createdAt: '2022-01-01T00:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread]);
  });

  it('should return the threads with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Body 1',
        category: 'Category 1',
        createdAt: '2022-01-01T00:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: initialState[0].downVotesBy.filter((userId) => userId !== action.payload.userId),
      },
    ]);
  });

  it('should return the threads with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Body 1',
        category: 'Category 1',
        createdAt: '2022-01-01T00:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
        upVotesBy: initialState[0].upVotesBy.filter((userId) => userId !== action.payload.userId),
      },
    ]);
  });

  it('should return the threads with the toggled neutral vote thread when given by TOGGLE_NEUTRAL_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Body 1',
        category: 'Category 1',
        createdAt: '2022-01-01T00:00:00.000Z',
        upVotesBy: ['user-1', 'user-2'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.filter((userId) => userId !== action.payload.userId),
        downVotesBy: initialState[0].downVotesBy.filter((userId) => userId !== action.payload.userId),
      },
    ]);
  });
});
