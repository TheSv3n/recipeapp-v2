import { UPDATE_PAGE_HEADING } from "../constants/navBarConstants";

export const pageHeadingReducer = (state = { title: "" }, action) => {
  switch (action.type) {
    case UPDATE_PAGE_HEADING:
      let title = action.payload;

      return {
        ...state,
        title: title,
      };
    default:
      return state;
  }
};
