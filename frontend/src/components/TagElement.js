import React from "react";
import { Link } from "react-router-dom";

const TagElement = ({ tag }) => {
  return (
    <div className="col-4 col-md-2 my-1">
      <Link to={`/search/${tag.tag}`}>
        <div className="recipe-tag mx-auto">{`${tag.tag}`}</div>
      </Link>
    </div>
  );
};

export default TagElement;
