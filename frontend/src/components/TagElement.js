import React from "react";
import { Link } from "react-router-dom";

const TagElement = ({ tag }) => {
  return <Link to={`/search/${tag.tag}`} ><div className="recipe-tag">{`${tag.tag}`}</div></Link>;
};

export default TagElement;
