/**
 * test scenario for commentReducer
 *
 * - commentReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the comment with the new comment when given by ADD_COMMENT action
 *  - should return the comment with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT action
 *  - should return the comment with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action
 *  - should return the comment with the toggled neutral vote comment when given by TOGGLE_NEUTRAL_VOTE_COMMENT action
 *
 */

import { describe, expect, it } from 'vitest';
import commentReducer from './reducer';

describe('commentReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the comment with the new comment when given by ADD_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = { type: 'ADD_COMMENT', payload: { comment: { id: 'comment-2', body: 'Comment 2' } } };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it('should return the comment with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Jane Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = { type: 'TOGGLE_UP_VOTE_COMMENT', payload: { commentId: 'comment-1', userId: 'users-1' } };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: initialState[0].downVotesBy.filter((userId) => userId !== action.payload.userId),
      },
      ...initialState.slice(1),
    ]);
  });

  it('should return the comment with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Jane Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = { type: 'TOGGLE_DOWN_VOTE_COMMENT', payload: { commentId: 'comment-1', userId: 'users-1' } };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
        upVotesBy: initialState[0].upVotesBy.filter((userId) => userId !== action.payload.userId),
      },
      ...initialState.slice(1),
    ]);
  });

  it('should return the comment with the toggled neutral vote comment when given by TOGGLE_NEUTRAL_VOTE_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: ['users-1', 'users-2'],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Jane Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = { type: 'TOGGLE_NEUTRAL_VOTE_COMMENT', payload: { commentId: 'comment-1', userId: 'users-1' } };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.filter((userId) => userId !== action.payload.userId),
        downVotesBy: initialState[0].downVotesBy.filter((userId) => userId !== action.payload.userId),
      },
      ...initialState.slice(1),
    ]);
  });
});
