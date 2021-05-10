import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_LIST_UPDATE_REQUEST,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  RECIPE_CREATE_RESET,
} from "../constants/recipeConstants";

export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { loading: true, recipes: [] };
    case RECIPE_LIST_SUCCESS:
      return {
        loading: false,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page,
        feedFinished: action.payload.feedFinished,
      };
    case RECIPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case RECIPE_LIST_UPDATE_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const recipeCreateReducer = (state = { recipe: [] }, action) => {
  switch (action.type) {
    case RECIPE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case RECIPE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        recipe: action.payload,
      };
    case RECIPE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RECIPE_CREATE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const recipeInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECIPE_DETAILS_SUCCESS:
      return {
        loading: false,
        recipe: action.payload,
      };
    case RECIPE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
