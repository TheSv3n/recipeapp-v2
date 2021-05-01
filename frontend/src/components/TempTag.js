import React from "react";

const TempTag = ({ index, tag, removeTempTag }) => {
  return (
    <div className="recipe-tag temp-tag">
      {tag.tag} -
      <span className="tag-close-icon">
        <i
          className="fas fa-times "
          onClick={() => {
            removeTempTag(index);
          }}
        ></i>
      </span>
    </div>
  );
};

export default TempTag;
