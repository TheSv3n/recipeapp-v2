import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRecipeWidget from "../components/NewRecipeWidget";
import RecipeListItem from "../components/RecipeListItem";
import Loader from "../components/Loader";
import { listUsersRecipes } from "../actions/recipeActions";

const UserRecipesScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeUserList = useSelector((state) => state.recipeUserList);
  const { loading, recipes, page, feedFinished } = recipeUserList;

  const updateFeed = () => {
    dispatch(listUsersRecipes(page + 1, false));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listUsersRecipes(1, false));
    }
  }, [dispatch, userInfo, history]);

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

      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="input-group col-12  my-1 mr-auto mb-5">
            {feedFinished ? (
              <button className="btn disabled-button mx-3 col-5 mx-auto">
                No More Recipes
              </button>
            ) : (
              <button
                onClick={updateFeed}
                className="btn submit-button mx-3 col-5 mx-auto"
              >
                Get more recipes
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserRecipesScreen;
