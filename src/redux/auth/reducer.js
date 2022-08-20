import * as t from "../actionsTypes";

const initState = {
  isLoggedIn: false,
  user: {},
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: action.payload, // we set this as true on login
      };

    case t.SET_USER_STATE:
      return {
        ...state,
        user: action.payload, // we set this as true on login
      };

    default:
      return state;
  }
}
