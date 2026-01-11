/**
 * test scenario for sharedAction
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { hideLoadingActionCreator, showLoadingActionCreator } from '../loading/action';
import { setNotifActionCreator } from '../notification/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

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

const fakeUsers = [
  {
    id: 'user-1',
    name: 'User 1',
    email: 'user1@example.com',
    avatar: 'https://ui-avatars.com/api/?name=User+1',
  },
];

const fakeThreads = [
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

const fakeError = new Error('Error fetching data');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api.get.mockClear();
    api.post.mockClear();
    api.put.mockClear();
    api.delete.mockClear();
    api._fetch.mockClear();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.get.mockResolvedValueOnce({ data: { users: fakeUsers } });
    api.get.mockResolvedValueOnce({ data: { threads: fakeThreads } });

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.get.mockRejectedValue(fakeError);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      setNotifActionCreator({
        type: 'error',
        message: fakeError.message,
      })
    );
  });
});
