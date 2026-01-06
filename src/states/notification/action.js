const ActionType = {
  SET_NOTIF: "SET_NOTIF",
  CLEAR_NOTIF: "CLEAR_NOTIF",
};

function setNotifActionCreator(notif) {
  return {
    type: ActionType.SET_NOTIF,
    payload: {
      notif,
    },
  };
}

function clearNotifActionCreator() {
  return {
    type: ActionType.CLEAR_NOTIF,
    payload: {
      notif: null,
    },
  };
}

export { ActionType, clearNotifActionCreator, setNotifActionCreator };
