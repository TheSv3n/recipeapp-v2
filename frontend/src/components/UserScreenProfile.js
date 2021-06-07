import React, { useEffect, useState } from "react";
import {
  getUserDetailsById,
  addUserFollower,
  removeUserFollower,
} from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoginWidget from "../components/LoginWidget";
import Loader from "../components/Loader";

const UserScreenProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const [userFollowing, setUserFollowing] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const setFollowing = () => {
    if (!userFollowing) {
      dispatch(addUserFollower(userId));
    } else {
      dispatch(removeUserFollower(userId));
    }
  };

  const checkUserFollowing = (followedBy, userId) => {
    if (followedBy.length === 0) {
      setUserFollowing(false);
    } else {
      for (let i = 0; i < followedBy.length; i++) {
        if (followedBy[i] === userId) {
          setUserFollowing(true);
        }
      }
    }
  };

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetailsById(userId));
    } else {
      if (userInfo && user) {
        checkUserFollowing(user.followedBy, userInfo._id);
      }
    }
  }, [dispatch, userId, userInfo, user]);

  return (
    <div className="container">
      {error ? (
        <div>error</div>
      ) : (
        user && (
          <div className="row">
            <div className="col-12 mx-auto col-md-12 col-lg-12">
              <li className="list-group-item text-capitalize my-2">
                <div className="container">
                  <div className="row">
                    <div className="col-12 mx-auto col-md-12 col-lg-12">
                      <div className="recipe-info">
                        <h3>{user.userName}</h3>
                        <h5>{user.name.split(" ")[0]}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="container col-12">
                    {userInfo ? (
                      userInfo._id === userId ? (
                        ""
                      ) : loading ? (
                        <Loader />
                      ) : (
                        <button
                          className="btn submit-button col-5 mx-auto"
                          onClick={setFollowing}
                        >
                          {userFollowing ? (
                            <div>
                              Unfollow User <i class="fas fa-user-minus"></i>
                            </div>
                          ) : (
                            <div>
                              Follow User <i class="fas fa-user-plus"></i>
                            </div>
                          )}
                        </button>
                      )
                    ) : (
                      <LoginWidget message="Log in to Follow Users" />
                    )}
                  </div>
                </div>
              </li>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserScreenProfile;
