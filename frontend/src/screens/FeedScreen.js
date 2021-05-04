import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listRecipes } from "../actions/recipeActions";
import RecipeListItem from "../components/RecipeListItem";
import NewRecipeWidget from "../components/NewRecipeWidget";
import LoginWidget from "../components/LoginWidget";
import SearchWidget from "../components/SearchWidget";
import FeedSwitch from "../components/FeedSwitch";
import Loader from "../components/Loader";

const FeedScreen = () => {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes, page, feedFinished } = recipeList;

  const updateFeed = () => {
    dispatch(listRecipes(page + 1, searchKeyword));
  };

  const handleFeedSwitch = (e) => {
    e.preventDefault();
    setShowTopRated(!showTopRated);
  };

  useEffect(() => {
    dispatch(listRecipes(1, searchKeyword));
  }, [dispatch, searchKeyword]);

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
              {showSearch ? (
                ""
              ) : (
                <FeedSwitch
                  showTopRated={showTopRated}
                  handleFeedSwitch={handleFeedSwitch}
                />
              )}
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

export default FeedScreen;
