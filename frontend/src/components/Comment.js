import React, { useState, useEffect } from "react";
import "../css/Comment.css";
import axios from "axios";

const Comment = ({ comment }) => {
  const [userName, setUserName] = useState("");
  var dateTime = new Date(comment.timeSent);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var dateString = `${days[dateTime.getDay()]} ${dateTime.getDate()}/${
    dateTime.getMonth() + 1
  }/${dateTime.getFullYear()} - ${addZero(dateTime.getHours())}:${addZero(
    dateTime.getMinutes()
  )}`;

  const getUserName = async (userId) => {
    const { data: userName } = await axios.get(`/api/users/${userId}/username`);
    setUserName(userName);
  };

  useEffect(() => {
    getUserName(comment.user);
  }, [comment]);

  return (
    <li className="list-group-item comment-card my-2">
      <div className="mr-auto">{comment.comment} </div>
      <div className="user">{userName}</div>
      <div className="timestamp">{dateString}</div>
    </li>
  );
};

export default Comment;
