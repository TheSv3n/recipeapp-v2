import {
  UPDATE_PAGE_HEADING,
  UPDATE_BACK_BUTTON,
} from "../constants/navBarConstants";

export const updatePageHeading = (newTitle) => (dispatch) => {
  dispatch({
    type: UPDATE_PAGE_HEADING,
    payload: newTitle,
  });
};

export const updateBackButton = (showBack) => (dispatch) => {
  dispatch({
    type: UPDATE_BACK_BUTTON,
    payload: showBack,
  });
};
