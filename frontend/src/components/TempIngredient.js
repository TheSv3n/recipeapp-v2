import React from "react";

const TempIngredient = ({ index, ingredient, removeTempIngredient }) => {
  return (
    <div className="row my-2">
      <div className="ml-3 col-5">{ingredient.name}</div>
      <div className="col-5">{ingredient.quantity}</div>

      <div className="col-1">
        <i
          className="fas fa-times close-icon"
          onClick={() => {
            removeTempIngredient(index);
          }}
        ></i>
      </div>
    </div>
  );
};

export default TempIngredient;
