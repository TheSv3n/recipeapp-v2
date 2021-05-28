import React from "react";
import "../css/FeedSwitch.css";

const UserScreenSwitch = ({ showProfile, handleProfileSwitch }) => {
  return (
    <div className="switch-container my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={handleProfileSwitch}>
        <div className="row">
          <div className="input-group col-12  my-1 mx-auto">
            <>
              <div className="mx-auto col-12">
                <button
                  type="submit"
                  className={`btn left-button switch-button ${
                    showProfile ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                >
                  Profile
                </button>
                <button
                  type="submit"
                  className={`btn right-button switch-button ${
                    showProfile ? "switch-inactive" : ""
                  } col-4 col-md-2 col-lg-3`}
                >
                  Recipes
                </button>
              </div>
            </>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserScreenSwitch;
