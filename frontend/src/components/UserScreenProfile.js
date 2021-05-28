import React, { useEffect } from "react";
import { getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const UserScreenProfile = ({ userId }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const handleFollow = () => {};

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

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
                  <div className="row">
                    <div className="input-group col-5 my-1">
                      <button
                        className="btn btn-block btn-danger mx-3 mt-1"
                        onClick={handleFollow}
                      >
                        Follow User
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

export default UserScreenProfile;
