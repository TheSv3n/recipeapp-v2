import React from "react";

const UserPageSwitch = ({
  handleFavoritesSwitch,
  showFavorites,
  showMyRecipes,
  showProfile,
  showFollowing,
}) => {
  return (
    <div className="switch-container my-1 my-md-2 my-lg-2 mx-2">
      <form>
        <div className="row">
          <div className="input-group col-12  my-1 mx-auto">
            <>
              <div className="mx-auto col-12">
                <button
                  type="submit"
                  className={`btn left-button switch-button ${
                    showMyRecipes ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                  onClick={(e) => handleFavoritesSwitch(e, 1)}
                >
                  <span className="switch-text">My Recipes</span>
                </button>
                <button
                  type="submit"
                  className={`btn middle-button switch-button ${
                    showFavorites ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                  onClick={(e) => handleFavoritesSwitch(e, 2)}
                >
                  <span className="switch-text">Favorites</span>
                </button>
                <button
                  type="submit"
                  className={`btn middle-button switch-button ${
                    showFollowing ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                  onClick={(e) => handleFavoritesSwitch(e, 3)}
                >
                  <span className="switch-text">Followed Users</span>
                </button>
                <button
                  type="submit"
                  className={`btn right-button switch-button ${
                    showProfile ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                  onClick={(e) => handleFavoritesSwitch(e, 4)}
                >
                  <span className="switch-text">Profile</span>
                </button>
              </div>
            </>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserPageSwitch;
