import React, { useEffect } from "react";
import { getUserDetailsById } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoginWidget from "../components/LoginWidget";
import Loader from "../components/Loader";

const UserScreenProfile = ({ userId }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const handleFollow = () => {};

  useEffect(() => {
    dispatch(getUserDetailsById(userId));
    if (userInfo) {
    }
  }, [dispatch, userId, userInfo]);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        user && (
          <div className="row">
            <div className="col-12 mx-auto col-md-12 col-lg-12">
              <li className="list-group-item text-capitalize my-2">
                <form>
                  <div className="row">
                    <div className="input-group col-12  my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-user mr-3" />
                          Username
                        </div>
                      </div>
                      {user.userName}
                    </div>
                  </div>
                  <>
                    <div className="row">
                      <div className="input-group col-6  my-1">
                        <div className="input-group-prepend">
                          <div className="input-group-text text-white">
                            <i className="fas fa-id-card mr-3" />
                            First Name
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="First Name"
                          value={user.name.split(" ")[0]}
                        />
                      </div>
                    </div>
                  </>
                </form>
                <div className="row">
                  {userInfo ? (
                    userInfo._id === userId ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-block btn-danger mx-3 mt-1"
                        onClick={handleFollow}
                      >
                        Follow User
                      </button>
                    )
                  ) : (
                    <LoginWidget message="Log in to Follow Users" />
                  )}
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
