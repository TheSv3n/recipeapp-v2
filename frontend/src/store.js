import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  recipeListReducer,
  recipeCreateReducer,
  recipeInfoReducer,
  recipeUserListReducer,
  recipeFavoriteListReducer,
} from "./reducers/recipeReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  recipeList: recipeListReducer,
  recipeCreate: recipeCreateReducer,
  recipeInfo: recipeInfoReducer,
  recipeUserList: recipeUserListReducer,
  recipeFavoriteList: recipeFavoriteListReducer,
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
