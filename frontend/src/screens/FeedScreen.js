import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRecipes } from "../actions/recipeActions";
import RecipeListItem from "../components/RecipeListItem";
import NewRecipeWidget from "../components/NewRecipeWidget";
import LoginWidget from "../components/LoginWidget";
import SearchWidget from "../components/SearchWidget";
import FeedSwitch from "../components/FeedSwitch";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { updatePageHeading } from "../actions/navBarActions";

const FeedScreen = ({ match }) => {
  const titleString = "Main Feed - RecipeApp";
  const searchString = match.params.search;
  const dispatch = useDispatch();

  const [showTopRated, setShowTopRated] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes, page, feedFinished } = recipeList;

  const updateFeed = () => {
    dispatch(listRecipes(page + 1, searchKeyword, showTopRated));
  };

  const handleFeedSwitch = (e) => {
    e.preventDefault();
    setShowTopRated(!showTopRated);
  };

  const updateSearch = (string) => {
    setSearchKeyword(string);
  };

  useEffect(() => {
    if (searchString) {
      setSearchKeyword(searchString);
      dispatch(listRecipes(1, searchKeyword, showTopRated));
      setSearchActive(true);
    } else {
      dispatch(listRecipes(1, searchKeyword, showTopRated));
    }
    dispatch(updatePageHeading(titleString));
  }, [dispatch, searchKeyword, showTopRated, searchString]);

  return (
    <>
      <Meta title={titleString} />
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              {userInfo ? (
                <NewRecipeWidget />
              ) : (
                <LoginWidget message="Login to Post Recipes" />
              )}
              <SearchWidget
                recipes={recipes}
                updateSearch={updateSearch}
                searchActive={searchActive}
                searchStringFromLink={searchString}
              />

              <FeedSwitch
                showTopRated={showTopRated}
                handleFeedSwitch={handleFeedSwitch}
              />
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
