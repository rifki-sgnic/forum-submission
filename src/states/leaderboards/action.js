import api from '../../utils/api';
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from '../loading/action';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const response = await api.get('/leaderboards');
      const { leaderboards } = response.data;
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
    }
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
