import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import deviceApi from "api/admin/stateManager";
// import userApi from "api/auth/stateManager";
// import alertApi from "api/alerts/stateManager";

const initialState = {};
const middleware = [thunk];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      // userApi,
      // alertApi,
    }),
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
};

export default configureStore;
