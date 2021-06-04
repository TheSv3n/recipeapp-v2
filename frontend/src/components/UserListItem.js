import React from "react";
import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  return (
    <Link to={`/user/${user._id}`} style={{ textDecoration: "none" }}>
      <div className="container">
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
            </li>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserListItem;
