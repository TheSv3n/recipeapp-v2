import React from "react";
import CommentEditor from "./CommentEditor";
import LoginWidget from "./LoginWidget";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";

const CommentBox = ({ recipe }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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
            recipe.comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
        </ul>
      </li>
    </div>
  );
};

export default CommentBox;
