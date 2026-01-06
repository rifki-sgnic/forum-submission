import { ActionType } from "./action";

function notificationReducer(notif = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_NOTIF:
      return action.payload.notif;
    case ActionType.CLEAR_NOTIF:
      return null;
    default:
      return notif;
  }
}

export default notificationReducer;
