import React from "react";
import "../css/FeedSwitch.css";

const FeedSwitch = ({ showTopRated, handleFeedSwitch }) => {
  return (
    <div className="switch-container my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={handleFeedSwitch}>
        <div className="row">
          <div className="input-group col-12  my-1 mx-auto">
            <>
              <div className="mx-auto col-12">
                <button
                  type="submit"
                  className={`btn left-button switch-button ${
                    showTopRated ? "switch-inactive" : ""
                  } col-4 col-md-2 col-lg-3`}
                >
                  Latest
                </button>
                <button
                  type="submit"
                  className={`btn right-button switch-button ${
                    showTopRated ? "" : "switch-inactive"
                  } col-4 col-md-2 col-lg-3`}
                >
                  Top Rated
                </button>
              </div>
            </>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedSwitch;
