import React, { useState } from "react";
import { useHistory } from "react-router";

const NewRecipeWidget = () => {
  const history = useHistory();
  const [recipeName, setRecipeName] = useState("");

  const newRecipeHandler = (e) => {
    e.preventDefault();
    history.push("/newrecipe");
  };
  return (
    <li className="list-group-item text-capitalize my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={newRecipeHandler}>
        <div className="row">
          <div className="input-group col-12  my-1 mr-auto">
            <div className="input-group-prepend">
              <div className="input-group-text text-white">
                <i className="fas fa-utensils" />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />

            <button
              type="submit"
              className="btn input-button mx-3 col-5 ml-auto"
            >
              Create Recipe
            </button>
          </div>
        </div>
      </form>
    </li>
  );
};

export default NewRecipeWidget;
