import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listRecipes } from "../actions/recipeActions";
import RecipeListItem from "../components/RecipeListItem";

const FeedScreen = () => {
  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes } = recipeList;

  useEffect(() => {
    dispatch(listRecipes());
  }, [dispatch]);

  return <></>;
};

export default FeedScreen;
