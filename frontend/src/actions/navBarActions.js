import { UPDATE_PAGE_HEADING } from "../constants/navBarConstants";

export const updatePageHeading = (newTitle) => (dispatch) => {
  dispatch({
    type: UPDATE_PAGE_HEADING,
    payload: newTitle,
  });
};
