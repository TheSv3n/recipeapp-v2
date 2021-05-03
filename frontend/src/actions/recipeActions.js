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
} from "../constants/recipeConstants";
import axios from "axios";

export const listRecipes = (newPage) => async (dispatch, getState) => {
  try {
    const {
      recipeList: { recipes: recipesOld },
    } = getState();

    if (newPage === 1) {
      dispatch({ type: RECIPE_LIST_REQUEST });
    } else {
      dispatch({ type: RECIPE_LIST_UPDATE_REQUEST });
    }

    const { data } = await axios.get(`/api/recipes?pageNumber=${newPage}`);

    let tempRecipes;

    if (newPage === 1) {
      tempRecipes = [...data.recipes];
    } else {
      tempRecipes = [...recipesOld, ...data.recipes];
    }

    let feedFinished = false;

    if (data.page === data.pages) {
      feedFinished = true;
    }

    const newPayload = {
      recipes: tempRecipes,
      page: data.page,
      pages: data.pages,
      feedFinished: feedFinished,
    };
    dispatch({
      type: RECIPE_LIST_SUCCESS,
      payload: newPayload,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/recipes/`, recipe, config);

    dispatch({
      type: RECIPE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecipeInfo = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/recipes/${recipeId}`, config);

    dispatch({
      type: RECIPE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
