import {
  DELETE_ACCOUNT_DATA,
  FAIL_DELETE_ACCOUNT_DATA,
  FAIL_GET_ACCOUNT_DATA,
  GET_ACCOUNT_DATA,
} from "../actionType";

const details = [];

export const loginAccountReducer = (state = { details }, action) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA:
      return { details: action.payload };
    case FAIL_GET_ACCOUNT_DATA:
      return { details: action.payload };
    default:
      return state;
  }
};

export const logoutAccountReducer = (state = { details }, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_DATA:
      return { details: action.payload };
    case FAIL_DELETE_ACCOUNT_DATA:
      return { details: action.payload };
    default:
      return state;
  }
};
