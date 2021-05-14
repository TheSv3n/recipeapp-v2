import React from "react";

const UserPageSwitch = ({ handleFavoritesSwitch, showFavorites }) => {
  return (
    <div className="switch-container my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={handleFavoritesSwitch}>
        <div className="row">
          <div className="input-group col-12  my-1 mx-auto">
            <>
              <div className="mx-auto col-12">
                <button
                  type="submit"
                  className={`btn left-button switch-button ${
                    showFavorites ? "switch-inactive" : ""
                  } col-4 col-md-2 col-lg-3`}
                >
                  My Recipes
                </button>
                <button
                  type="submit"
                  className={`btn right-button switch-button ${
                    showFavorites ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                >
                  Favorites
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
