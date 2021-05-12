import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRecipeWidget from "../components/NewRecipeWidget";

const UserRecipesScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    history.push("/login");
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              <NewRecipeWidget />
            </ul>
          </div>
        </div>
      </div>

      <section className="recipe-list">
        {recipes &&
          recipes.map((recipe) => {
            return <RecipeListItem key={recipe.id} recipe={recipe} />;
          })}
      </section>
    </>
  );
};

export default UserRecipesScreen;
