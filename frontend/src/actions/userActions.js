import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_ADD_FOLLOWER_REQUEST,
  USER_ADD_FOLLOWER_SUCCESS,
  USER_ADD_FOLLOWER_FAIL,
  USER_REMOVE_FOLLOWER_REQUEST,
  USER_REMOVE_FOLLOWER_SUCCESS,
  USER_REMOVE_FOLLOWER_FAIL,
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_UPDATE_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAIL,
  USER_FOLLOWING_RESET,
} from "../constants/userConstants";
import { RECIPE_CREATE_RESET } from "../constants/recipeConstants";

export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { userName, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: RECIPE_CREATE_RESET });
  dispatch({ type: USER_FOLLOWING_RESET });
};

export const registerUser =
  (userName, firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { userName, firstName, lastName, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
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

    const { data } = await axios.get(`/api/users/`, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetailsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/users/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUserFollower = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_FOLLOWER_REQUEST,
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

    await axios.put(`/api/users/${userId}/addfollower`, {}, config);

    dispatch({
      type: USER_ADD_FOLLOWER_SUCCESS,
    });
    dispatch(getUserDetailsById(userId));
  } catch (error) {
    dispatch({
      type: USER_ADD_FOLLOWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeUserFollower = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REMOVE_FOLLOWER_REQUEST,
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

    await axios.put(`/api/users/${userId}/removefollower`, {}, config);

    dispatch({
      type: USER_REMOVE_FOLLOWER_SUCCESS,
    });
    dispatch(getUserDetailsById(userId));
  } catch (error) {
    dispatch({
      type: USER_REMOVE_FOLLOWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFollowedUsers = (newPage) => async (dispatch, getState) => {
  try {
    if (newPage === 1) {
      dispatch({ type: USER_FOLLOWING_REQUEST });
    } else {
      dispatch({ type: USER_FOLLOWING_UPDATE_REQUEST });
    }
    const {
      userFollowingList: { users: usersOld },
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
      `/api/users/followed?pageNumber=${newPage}`,
      config
    );

    let tempUsers;

    if (newPage === 1) {
      tempUsers = [...data.users];
    } else {
      tempUsers = [...usersOld, ...data.users];
    }

    let feedFinished = false;

    if (data.page === data.pages) {
      feedFinished = true;
    }

    const newPayload = {
      users: tempUsers,
      page: data.page,
      pages: data.pages,
      feedFinished: feedFinished,
    };
    dispatch({
      type: USER_FOLLOWING_SUCCESS,
      payload: newPayload,
    });
  } catch (error) {
    dispatch({
      type: USER_FOLLOWING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
