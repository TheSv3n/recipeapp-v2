import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeListItem = ({ recipe }) => {
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [userFavorited, setUserFavorited] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkUserFavorite = (followedBy, userId) => {
    if (followedBy.length === 0) {
      setUserFavorited(false);
    } else {
      for (let i = 0; i < followedBy.length; i++) {
        if (followedBy[i] === userId) {
          setUserFavorited(true);
        }
      }
    }
  };

  const countRatings = (ratings) => {
    let tempUpvotes = 0;
    let tempDownvotes = 0;

    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].reaction === 1) {
        tempUpvotes++;
      } else if (ratings[i].reaction === 2) {
        tempDownvotes++;
      }
    }

    setUpvotesCount(tempUpvotes);
    setDownvotesCount(tempDownvotes);
  };

  useEffect(() => {
    countRatings(recipe.ratings);
    if (userInfo) {
      checkUserFavorite(recipe.followedBy, userInfo._id);
    }
  }, [recipe, userInfo]);

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: "none" }}>
        <div className="img-container">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fluid
            className="recipe-card-image"
          ></Image>
        </div>
        <div className="recipe-info">
          <h3>{recipe.name}</h3>
          <h4>Uploaded by {recipe.creator}</h4>
          <h5>{recipe.description}</h5>
          <div className="recipe-card-icons-row">
            <i className="far fa-thumbs-up mx-2 recipe-card-icon upvoted" />
            {upvotesCount}
            <i className="far mx-2 fa-thumbs-down recipe-card-icon downvoted" />
            {downvotesCount}
            {userFavorited ? (
              <i className="fas mx-2 fa-heart recipe-card-icon favorited" />
            ) : (
              <i className="far mx-2 fa-heart recipe-card-icon favorited" />
            )}

            {recipe.followedBy.length}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeListItem;
