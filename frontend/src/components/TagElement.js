import React from "react";

const TagElement = ({ tag }) => {
  return <div className="recipe-tag">{`${tag.tag}`}</div>;
};

export default TagElement;
