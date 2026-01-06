import { ActionType } from "./action";

function loadingReducer(count = 0, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_LOADING:
      return count + 1;
    case ActionType.HIDE_LOADING:
      return count - 1;
    default:
      return count;
  }
}

export default loadingReducer;
