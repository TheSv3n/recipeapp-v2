import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { getUserProfile, logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const ProfileInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, userInfo, user, history]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
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
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Username"
                        value={user.userName}
                        readOnly
                      />
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
                      <div className="input-group col-6 my-1">
                        <div className="input-group-prepend">
                          <div className="input-group-text text-white">
                            <i className="fas fa-id-card mr-3" />
                            Last Name
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Last Name"
                          value={user.name.split(" ")[1]}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-group col-12 my-1">
                        <div className="input-group-prepend">
                          <div className="input-group-text text-white">
                            <i className="fas fa-at mr-3" />
                            Email Address
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email Address"
                          value={user.email}
                        />
                      </div>
                    </div>
                  </>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <button
                        className="btn btn-block btn-danger mx-3 mt-1"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </form>
              </li>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileInfo;
