import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();
  const pageHeading = useSelector((state) => state.pageHeading);
  const { title } = pageHeading;
  return (
    <div className="navbar fixed-top">
      <div className="mr-auto ml-md-4 title-text">
        <span className="nav-icon-span" onClick={history.goBack}>
          <i className="far fa-arrow-alt-circle-left" />
        </span>
      </div>
      <div className="mx-auto title-text page-heading">{title}</div>
      <div className="ml-auto mr-md-4 title-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="nav-icon-span">
            {" "}
            <i className="fas fa-list-alt"></i>
          </span>
        </Link>
        <Link to="/userrecipes" style={{ textDecoration: "none" }}>
          <span className="nav-icon-span">
            {" "}
            <i className="fas fa-user"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
