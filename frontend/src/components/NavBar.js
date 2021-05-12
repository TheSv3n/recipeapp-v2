import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="mr-auto ml-4 title-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="nav-icon-span">
            <i className="far fa-arrow-alt-circle-left" />
          </span>
        </Link>
      </div>
      <div className="mx-auto title-text">Recipe App</div>
      <div className="ml-auto mr-4 title-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="nav-icon-span">
            {" "}
            <i className="fas fa-list-alt"></i>
          </span>
        </Link>
        <Link to="/userrecipes" style={{ textDecoration: "none" }}>
          <span className="nav-icon-span">
            {" "}
            <i className="fas fa-utensils"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
