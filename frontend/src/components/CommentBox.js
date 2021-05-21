import React, { useState, useEffect } from "react";
import CommentEditor from "./CommentEditor";
import LoginWidget from "./LoginWidget";
import Comment from "./Comment";
import { useSelector } from "react-redux";

const CommentBox = ({ recipe }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [commentArray, setCommentArray] = useState([]);

  const sortComments = (comments) => {
    const sortedComments = [...comments].sort((a, b) => {
      return new Date(b.timeSent) - new Date(a.timeSent);
    });

    setCommentArray(sortedComments);
  };

  useEffect(() => {
    recipe && sortComments(recipe.comments);
  }, [recipe]);
  return (
    <div>
      <li className="list-group-item my-1 my-md-2 my-lg-2 mx-2">
        {userInfo ? (
          <CommentEditor />
        ) : (
          <LoginWidget message="Login to Post Recipes" />
        )}

        <ul className="list-group">
          {recipe &&
            commentArray.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
        </ul>
      </li>
    </div>
  );
};

export default CommentBox;
