import { SET_SESSION } from "../constants/action-types";
import { GET_CURRENT_SESSION } from "../constants/action-types";
import { CLEAR_SESSION } from "../constants/action-types";

const initialState = {
  session: {},
};

interface Action {
  type: string,
  payload: any
}

function rootReducer(state = initialState, action: Action) {
  if (action.type === SET_SESSION) {
    return {
      ...state,
      session: action.payload
    };
  }
  if (action.type === GET_CURRENT_SESSION) {
    return {
      ...state,
      session: state.session
    };
  }
  if (action.type === CLEAR_SESSION) {
    return {
      ...state,
      session: initialState
    };
  }
  return state;
}

export default rootReducer;
