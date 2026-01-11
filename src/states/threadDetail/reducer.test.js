/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return the thread detail with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL action
 *
 */
import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = {};
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
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

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread detail with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      createdAt: '2022-01-01T00:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: initialState.downVotesBy.filter((userId) => userId !== action.payload.userId),
    });
  });

  it('should return the thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      createdAt: '2022-01-01T00:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
      upVotesBy: initialState.upVotesBy.filter((userId) => userId !== action.payload.userId),
    });
  });

  it('should return the thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      createdAt: '2022-01-01T00:00:00.000Z',
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: [],
    };
    const action = {
      type: 'TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.filter((userId) => userId !== action.payload.userId),
      downVotesBy: initialState.downVotesBy.filter((userId) => userId !== action.payload.userId),
    });
  });
});
