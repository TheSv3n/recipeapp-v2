import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeListItem = ({ recipe }) => {
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [userFavorited, setUserFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
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

            {favoritesCount}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeListItem;
