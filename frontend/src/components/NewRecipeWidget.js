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
          <button
            type="submit"
            className="btn submit-button mx-3 col-5 mx-auto"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </li>
  );
};

export default NewRecipeWidget;
