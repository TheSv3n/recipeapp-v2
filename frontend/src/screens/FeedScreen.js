import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listRecipes } from "../actions/recipeActions";
import RecipeListItem from "../components/RecipeListItem";
import NewRecipeWidget from "../components/NewRecipeWidget";
import LoginWidget from "../components/LoginWidget";
import SearchWidget from "../components/SearchWidget";
import FeedSwitch from "../components/FeedSwitch";

const FeedScreen = () => {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes } = recipeList;

  useEffect(() => {
    dispatch(listRecipes());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              {userInfo ? (
                <NewRecipeWidget />
              ) : (
                <LoginWidget message="Login to Post Recipes" />
              )}
              <SearchWidget />
              {showSearch ? "" : <FeedSwitch />}
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

export default FeedScreen;
