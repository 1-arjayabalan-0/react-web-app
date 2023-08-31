import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducer/rootReducer";
var window: any;
const composeEnhancer = compose(
  typeof window !== "undefined" && window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f
);
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(logger, thunk))
);
export default store;
