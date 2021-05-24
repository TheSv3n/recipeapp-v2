import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  recipeListReducer,
  recipeCreateReducer,
  recipeInfoReducer,
  recipeUserListReducer,
  recipeFavoriteListReducer,
} from "./reducers/recipeReducers";
import { pageHeadingReducer } from "./reducers/navBarReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  recipeList: recipeListReducer,
  recipeCreate: recipeCreateReducer,
  recipeInfo: recipeInfoReducer,
  recipeUserList: recipeUserListReducer,
  recipeFavoriteList: recipeFavoriteListReducer,
  pageHeading: pageHeadingReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
