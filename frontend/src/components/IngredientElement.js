import React from "react";

const IngredientElement = ({ ingredient }) => {
  return (
    <div className="recipe-ingredient">{`${ingredient.name} ${ingredient.quantity}`}</div>
  );
};

export default IngredientElement;
