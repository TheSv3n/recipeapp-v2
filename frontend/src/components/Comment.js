import React from "react";
import "../css/Comment.css";

const Comment = ({ comment }) => {
  var dateTime = new Date(comment.timeSent);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var dateString = `${
    days[dateTime.getDay()]
  } ${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - ${addZero(
    dateTime.getHours()
  )}:${addZero(dateTime.getMinutes())}`;
  return (
    <li className="list-group-item comment-card my-2">
      <div className="mr-auto">{comment.comment} </div>
      <div className="user">{comment.user}</div>
      <div className="timestamp">{dateString}</div>
    </li>
  );
};

export default Comment;
