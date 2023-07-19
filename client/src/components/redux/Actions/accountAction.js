import {
  DELETE_ACCOUNT_DATA,
  FAIL_DELETE_ACCOUNT_DATA,
  FAIL_GET_ACCOUNT_DATA,
  GET_ACCOUNT_DATA,
} from "../actionType";

export const loginAccountAction = (token) => async (dispatch,getState) => {
  try {
    // console.log(token);
    const data = await fetch("/getaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const res = await data.json();
    // console.log(res.message[0]);
    dispatch({ type: GET_ACCOUNT_DATA, payload: res.message[0] });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_GET_ACCOUNT_DATA, payload: error });
  }
};

export const logoutAccountAction = () => async (dispatch) => {
  try {
    const res = "";
    dispatch({ type: DELETE_ACCOUNT_DATA, payload: res });
  } catch (error) {
    dispatch({ type: FAIL_DELETE_ACCOUNT_DATA, payload: error.response });
  }
};
