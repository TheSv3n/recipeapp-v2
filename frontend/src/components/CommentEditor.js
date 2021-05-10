import React, { useState } from "react";
import { addRecipeComment } from "../actions/recipeActions";
import { useDispatch, useSelector } from "react-redux";

const CommentEditor = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const recipeInfo = useSelector((state) => state.recipeInfo);
  const { recipe } = recipeInfo;

  const submitComment = (e) => {
    e.preventDefault();
    dispatch(addRecipeComment(recipe._id, comment));
    setComment("");
  };
  return (
    <div>
      <form>
        <div className="row">
          <div className="input-group col-12  my-1 mr-auto">
            <textarea
              type="text"
              className="form-control comment-area"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <button
            className="btn submit-button mx-3 col-11 mx-auto"
            onClick={submitComment}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentEditor;
