/**
 * test scenario for asyncSetAuthUser
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action and call alert correctly when login failed
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { hideLoadingActionCreator, showLoadingActionCreator } from '../loading/action';
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

const fakeUser = {
  id: 'user-1',
  name: 'User 1',
  email: 'user1@example.com',
  avatar: 'https://ui-avatars.com/api/?name=User+1',
};

const fakeToken = 'fake-token';
const fakeError = new Error('Error login');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api.get.mockClear();
    api.post.mockClear();
    api.put.mockClear();
    api.delete.mockClear();
    api._fetch.mockClear();

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn(),
        removeItem: vi.fn(),
        getItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should dispatch action correctly when login success', async () => {
    // arrange
    // stub implementation
    api.post.mockResolvedValueOnce({ data: { token: fakeToken } });
    api.get.mockResolvedValueOnce({ data: { user: fakeUser } });

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'user1@example.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.post).toHaveBeenCalledWith('/login', null, {
      body: JSON.stringify({ email: 'user1@example.com', password: 'password' }),
    });
    expect(window.localStorage.setItem).toHaveBeenCalledWith('accessToken', fakeToken);
    expect(api.get).toHaveBeenCalledWith('/users/me', fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    // stub implementation
    api.post.mockRejectedValue(fakeError);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'user1@example.com', password: 'password' })(dispatch);

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
