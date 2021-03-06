import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const SearchWidget = ({
  count,
  updateSearch,
  searchActive,
  searchStringFromLink,
}) => {
  const history = useHistory();
  const [searchString, setSearchString] = useState("");
  const [searchTooShort, setSearchTooShort] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchString.length < 3) {
      setSearchTooShort(true);
    } else {
      updateSearch(searchString);
      setShowSearch(true);
      setSearchTooShort(false);
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSearchString("");
    updateSearch("");
    setShowSearch(false);
    if (searchActive) {
      history.push("/");
    }
  };

  useEffect(() => {
    if (searchActive) {
      setShowSearch(true);
      setSearchString(searchStringFromLink);
    }
  }, [searchActive, searchStringFromLink]);

  return (
    <li className="list-group-item text-capitalize my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="input-group col-12  my-1 mr-auto">
            <div className="input-group-prepend">
              <div className="input-group-text text-white">
                <i className="fas fa-search" />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Ingredient, Name or Tag"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />

            <button
              type="submit"
              className="btn input-button mx-3 col-3 ml-auto"
            >
              Search
            </button>
          </div>
        </div>
        {searchTooShort ? (
          <div className="container">
            <div className="row">
              <li className="list-group-item text-center my-2 mx-auto border-danger col-5 bg-danger text-white">
                Search must be greater than 3 characters
              </li>
            </div>
          </div>
        ) : (
          ""
        )}
        {showSearch ? (
          <div className="container">
            <div className="row">
              <div className="mx-auto">
                Returned {count} results -{" "}
                <button className="btn submit-button" onClick={clearSearch}>
                  clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </li>
  );
};

export default SearchWidget;
