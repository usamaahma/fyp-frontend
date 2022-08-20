import * as t from "./actionsTypes";

export const setLoginState = (payload) => (dispatch) => {
  dispatch({
    type: t.SET_LOGIN_STATE,
    payload,
  });
};

export const setUserState = (payload) => (dispatch) => {
  dispatch({
    type: t.SET_USER_STATE,
    payload,
  });
};
