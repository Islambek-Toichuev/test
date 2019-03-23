import { SET_SESSION } from "../constants/action-types";
import { GET_CURRENT_SESSION } from "../constants/action-types";
import { CLEAR_SESSION } from "../constants/action-types";
import { User } from "../../interfaces/index";

export const set_session = (payload: User) => {
  return {
    type: SET_SESSION,
    payload
  };
};

export const get_session = (payload: User) => {
  return {
    type: GET_CURRENT_SESSION,
    payload
  };
};

export const clear_session = () => {
  return {
    type: CLEAR_SESSION
  };
};
