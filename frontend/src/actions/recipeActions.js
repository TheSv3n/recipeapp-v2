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
  RECIPE_SET_RATING_REQUEST,
  RECIPE_SET_RATING_SUCCESS,
  RECIPE_SET_RATING_FAIL,
  RECIPE_ADD_FOLLOWER_REQUEST,
  RECIPE_ADD_FOLLOWER_SUCCESS,
  RECIPE_ADD_FOLLOWER_FAIL,
  RECIPE_REMOVE_FOLLOWER_REQUEST,
  RECIPE_REMOVE_FOLLOWER_SUCCESS,
  RECIPE_REMOVE_FOLLOWER_FAIL,
  RECIPE_ADD_COMMENT_REQUEST,
  RECIPE_ADD_COMMENT_SUCCESS,
  RECIPE_ADD_COMMENT_FAIL,
  RECIPE_USERLIST_REQUEST,
  RECIPE_USERLIST_SUCCESS,
  RECIPE_USERLIST_FAIL,
  RECIPE_USERLIST_UPDATE_REQUEST,
  RECIPE_FAVORITES_LIST_REQUEST,
  RECIPE_FAVORITES_LIST_SUCCESS,
  RECIPE_FAVORITES_LIST_FAIL,
  RECIPE_FAVORITES_LIST_UPDATE_REQUEST,
  RECIPE_ADD_TAG_REQUEST,
  RECIPE_ADD_TAG_SUCCESS,
  RECIPE_ADD_TAG_FAIL,
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAIL,
} from "../constants/recipeConstants";
import { updatePageHeading } from "../actions/navBarActions";
import axios from "axios";

export const listRecipes =
  (newPage, searchKeyword, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: RECIPE_LIST_REQUEST });
      } else {
        dispatch({ type: RECIPE_LIST_UPDATE_REQUEST });
      }
      const {
        recipeList: { recipes: recipesOld },
      } = getState();

      const { data } = await axios.get(
        `/api/recipes?pageNumber=${newPage}&keyword=${searchKeyword}&ranked=${showRanked}`
      );

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
        count: data.count,
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

export const getRecipeInfo =
  (recipeId, update) => async (dispatch, getState) => {
    try {
      console.log(update);
      if (!update) {
        dispatch({
          type: RECIPE_DETAILS_REQUEST,
        });
      }

      const { data } = await axios.get(`/api/recipes/${recipeId}`);

      dispatch({
        type: RECIPE_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch(updatePageHeading(`${data.name}`));
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

export const setRecipeRating =
  (recipeId, reaction) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_SET_RATING_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/recipes/${recipeId}/ratings`,
        { reaction: reaction },
        config
      );

      dispatch({
        type: RECIPE_SET_RATING_SUCCESS,
      });
      dispatch(getRecipeInfo(recipeId, true));
    } catch (error) {
      dispatch({
        type: RECIPE_SET_RATING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addRecipeFollower = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_ADD_FOLLOWER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/recipes/${recipeId}/addfollower`, {}, config);

    dispatch({
      type: RECIPE_ADD_FOLLOWER_SUCCESS,
    });
    dispatch(getRecipeInfo(recipeId, true));
  } catch (error) {
    dispatch({
      type: RECIPE_ADD_FOLLOWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeRecipeFollower =
  (recipeId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_REMOVE_FOLLOWER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/recipes/${recipeId}/removefollower`, {}, config);

      dispatch({
        type: RECIPE_REMOVE_FOLLOWER_SUCCESS,
      });
      dispatch(getRecipeInfo(recipeId, true));
    } catch (error) {
      dispatch({
        type: RECIPE_REMOVE_FOLLOWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addRecipeComment =
  (recipeId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_ADD_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/recipes/${recipeId}/comments`,
        { comment: comment },
        config
      );

      dispatch({
        type: RECIPE_ADD_COMMENT_SUCCESS,
      });
      dispatch(getRecipeInfo(recipeId, true));
    } catch (error) {
      dispatch({
        type: RECIPE_ADD_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsersRecipes =
  (newPage, showRanked, userId) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: RECIPE_USERLIST_REQUEST });
      } else {
        dispatch({ type: RECIPE_USERLIST_UPDATE_REQUEST });
      }
      const {
        recipeUserList: { recipes: recipesOld },
      } = getState();

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `/api/recipes/user/${
          userId ? userId : userInfo._id
        }?pageNumber=${newPage}&ranked=${showRanked}`
      );

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
        type: RECIPE_USERLIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: RECIPE_USERLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsersFavorites =
  (newPage, showRanked) => async (dispatch, getState) => {
    try {
      if (newPage === 1) {
        dispatch({ type: RECIPE_FAVORITES_LIST_REQUEST });
      } else {
        dispatch({ type: RECIPE_FAVORITES_LIST_UPDATE_REQUEST });
      }
      const {
        recipeFavoriteList: { recipes: recipesOld },
      } = getState();

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/recipes/user/${userInfo._id}/favorites?pageNumber=${newPage}&ranked=${showRanked}`,
        config
      );

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
        type: RECIPE_FAVORITES_LIST_SUCCESS,
        payload: newPayload,
      });
    } catch (error) {
      dispatch({
        type: RECIPE_FAVORITES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addRecipeTag = (recipeId, tag) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECIPE_ADD_TAG_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/recipes/${recipeId}/tags`, { tag: tag }, config);

    dispatch({
      type: RECIPE_ADD_TAG_SUCCESS,
    });
    dispatch(getRecipeInfo(recipeId, true));
  } catch (error) {
    dispatch({
      type: RECIPE_ADD_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRecipe =
  (recipeId, updatedField) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/recipes/${recipeId}/`, updatedField, config);

      dispatch({
        type: RECIPE_UPDATE_SUCCESS,
      });
      dispatch(getRecipeInfo(recipeId, true));
    } catch (error) {
      dispatch({
        type: RECIPE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
