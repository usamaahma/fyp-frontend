import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let dev = "development";
const middlewares = [thunk];
const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(
  rootReducer,
  compose(
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension && dev === "development"
        ? window.devToolsExtension()
        : (f) => f
    )
  )
);

export { store };
