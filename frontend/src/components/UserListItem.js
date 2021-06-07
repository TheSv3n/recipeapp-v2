import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserListItem = ({ user }) => {
  const [recipeCount, setRecipeCount] = useState(0);

  const getRecipeCount = async (userId) => {
    const { data: count } = await axios.get(
      `/api/recipes/user/${userId}/count`
    );
    setRecipeCount(count);
  };

  useEffect(() => {
    getRecipeCount(user._id);
  }, [user]);

  return (
    <div className="recipe-card">
      <Link to={`/user/${user._id}`} style={{ textDecoration: "none" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 mx-auto col-md-12 col-lg-12">
              <div className="recipe-info">
                <h3>{user.userName}</h3>
                <h5>{user.name.split(" ")[0]}</h5>
              </div>
            </div>
            <div className="recipe-card-icons-row">
              <i className="fas fa-utensils mx-2 recipe-card-icon upvoted" />
              {recipeCount}
              <i className="fas fa-users mx-2 recipe-card-icon upvoted" />
              {user.followedBy.length}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserListItem;
