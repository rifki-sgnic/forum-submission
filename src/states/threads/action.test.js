/**
 * test scenario for threadsAction
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when thread creation success
 *  - should dispatch action and call notification correctly when thread creation failed
 *
 * - asyncToggleUpVoteThread thunk
 *  - should dispatch action correctly when up-vote success
 *  - should dispatch action and call notification correctly when up-vote failed
 *  - should dispatch notification when user is not logged in
 *
 * - asyncToggleDownVoteThread thunk
 *  - should dispatch action correctly when down-vote success
 *  - should dispatch action and call notification correctly when down-vote failed
 *
 * - asyncToggleNeutralVoteThread thunk
 *  - should dispatch action correctly when neutral-vote success
 *  - should dispatch action and call notification correctly when neutral-vote failed
 *
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
} from './action';
import { setNotifActionCreator } from '../notification/action';

vi.mock('../../utils/api', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      _fetch: vi.fn(),
    },
  };
});

const fakeThreadResponse = {
  data: {
    thread: {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      createdAt: '2022-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  },
};

const fakeError = new Error('Something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api.post.mockClear();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('fake-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should dispatch action correctly when thread creation success', async () => {
    // arrange
    api.post.mockResolvedValueOnce(fakeThreadResponse);
    const dispatch = vi.fn();
    const threadInput = {
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
    };

    // action
    await asyncAddThread(threadInput)(dispatch);

    // assert
    expect(api.post).toHaveBeenCalledWith('/threads', 'fake-token', {
      body: JSON.stringify(threadInput),
    });
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse.data.thread));
  });

  it('should dispatch action and call notification correctly when thread creation failed', async () => {
    // arrange
    api.post.mockRejectedValueOnce(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncAddThread({})(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: fakeError.message,
      })
    );
  });
});

describe('asyncToggleUpVoteThread thunk', () => {
  const authUser = { id: 'user-1' };
  const threadId = 'thread-1';

  beforeEach(() => {
    api.post.mockClear();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('fake-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should dispatch action correctly when up-vote success', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockResolvedValueOnce({});

    // action
    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(api.post).toHaveBeenCalledWith(`/threads/${threadId}/up-vote`, 'fake-token', {
      body: JSON.stringify({ userId: authUser.id }),
    });
  });

  it('should dispatch action and call notification correctly when up-vote failed', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockRejectedValueOnce(fakeError);

    // action
    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: fakeError.message,
      })
    );
    // Revert action
    expect(dispatch).toHaveBeenLastCalledWith(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });

  it('should dispatch notification when user is not logged in', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });

    // action
    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: 'You need to login to vote.',
      })
    );
    expect(api.post).not.toHaveBeenCalled();
  });
});

describe('asyncToggleDownVoteThread thunk', () => {
  const authUser = { id: 'user-1' };
  const threadId = 'thread-1';

  beforeEach(() => {
    api.post.mockClear();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('fake-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should dispatch action correctly when down-vote success', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockResolvedValueOnce({});

    // action
    await asyncToggleDownVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(api.post).toHaveBeenCalledWith(`/threads/${threadId}/down-vote`, 'fake-token', {
      body: JSON.stringify({ userId: authUser.id }),
    });
  });

  it('should dispatch action and call notification correctly when down-vote failed', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockRejectedValueOnce(fakeError);

    // action
    await asyncToggleDownVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: fakeError.message,
      })
    );
    expect(dispatch).toHaveBeenLastCalledWith(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });
});

describe('asyncToggleNeutralVoteThread thunk', () => {
  const authUser = { id: 'user-1' };
  const threadId = 'thread-1';

  beforeEach(() => {
    api.post.mockClear();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('fake-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should dispatch action correctly when neutral-vote success', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockResolvedValueOnce({});

    // action
    await asyncToggleNeutralVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(api.post).toHaveBeenCalledWith(`/threads/${threadId}/neutral-vote`, 'fake-token', {
      body: JSON.stringify({ userId: authUser.id }),
    });
  });

  it('should dispatch action and call notification correctly when neutral-vote failed', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({ authUser });
    api.post.mockRejectedValueOnce(fakeError);

    // action
    await asyncToggleNeutralVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: fakeError.message,
      })
    );
    expect(dispatch).toHaveBeenLastCalledWith(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });
});
