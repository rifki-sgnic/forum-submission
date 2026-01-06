import api from '../../utils/api';
import { asyncSetAuthUser } from '../authUser/action';
import { hideLoadingActionCreator, showLoadingActionCreator } from '../loading/action';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ email, password, name }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      await api.post('/register', null, {
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      return await dispatch(asyncSetAuthUser({ email, password }));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      return false;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
