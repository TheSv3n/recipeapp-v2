import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipeTag } from "../actions/recipeActions";

const AddTagWidget = ({ recipeId }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [active, setActive] = useState(false);

  const newTagHandler = () => {
    dispatch(addRecipeTag(recipeId, tag));
    setTag("");
    setActive(false);
  };

  return (
    <>
      {active ? (
        <div className="input-group col-7 col-md-4 my-1">
          <div className="input-group-prepend">
            <div className="input-group-text text-white">
              <i className="fas fa-tag" />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            className="btn input-button col-4 ml-auto"
            onClick={newTagHandler}
          >
            <span className="d-none d-lg-block">Add Tag</span>
            <span className="d-lg-none">
              <i className="fas fa-plus" />
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => setActive(!active)}
          className="btn submit-button col-1 "
        >
          +
        </button>
      )}
    </>
  );
};

export default AddTagWidget;
