import * as t from "./actionsTypes";

export const setLoginState = (payload) => (dispatch) => {
  dispatch({
    type: t.SET_LOGIN_STATE,
    payload,
  });
};
