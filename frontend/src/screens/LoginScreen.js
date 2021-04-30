import React, { useState, useEffect } from "react";
import { login, registerUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({ location, history }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUserToggle, setNewUserToggle] = useState(false);
  const [errorText, setErrorText] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { error: registerError } = userRegister;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (error) {
      setErrorText(error);
    } else if (registerError) {
      setErrorText(registerError);
    }
  }, [history, userInfo, redirect, error, registerError, dispatch]);

  const dataValid = () => {
    if (
      userName === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      emailVerify === "" ||
      password === "" ||
      passwordVerify === ""
    ) {
      setErrorText("Please enter data in all fields");
      return false;
    }
    if (
      password.length < 8 ||
      password.toUpperCase() === password ||
      password.toLowerCase() === password ||
      !/\d/.test(password)
    ) {
      setErrorText(
        "Password must be at least 8 characters long, contain at least one uppercase character,one lower case character and one number"
      );
      return false;
    }
    if (password !== passwordVerify) {
      setErrorText("Please ensure passwords match");
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.toLowerCase()
      )
    ) {
      setErrorText("Please enter a valid email address");
      return false;
    }
    if (email !== emailVerify) {
      setErrorText("Please ensure email addresses match");
      return false;
    }
    return true;
  };

  const createUserHandler = (e) => {
    e.preventDefault();
    if (dataValid()) {
      dispatch(registerUser(userName, firstName, lastName, email, password));
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };

  const toggleNewUserHandler = (e) => {
    e.preventDefault();
    setNewUserToggle(!newUserToggle);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <li className="list-group-item my-2">
            <form>
              <div className="row">
                <div className="input-group col-12  my-1">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white">
                      <i className="fas fa-user" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      newUserToggle ? "Username" : "Username/Email Address"
                    }
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-group col-12 my-1">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white">
                      <i className="fas fa-key" />
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {newUserToggle ? (
                <>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-key" />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Verify Password"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-6  my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-id-card" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="input-group col-6 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-id-card" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-at" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-at" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Verify Email Address"
                        value={emailVerify}
                        onChange={(e) => setEmailVerify(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="row mx-auto">
                <button
                  type="submit"
                  onClick={newUserToggle ? createUserHandler : loginHandler}
                  className="btn submit-button col-5 mr-auto mt-1"
                >
                  {newUserToggle ? "Create" : "Login"}
                </button>

                <button
                  onClick={toggleNewUserHandler}
                  className="btn btn-block submit-button col-5 ml-auto mt-1"
                >
                  {newUserToggle ? "Back to Login" : "Create User"}
                </button>
              </div>
              {errorText ? (
                <div className="row">
                  <li className="list-group-item text-center my-2 mx-auto border-danger col-11 bg-danger text-white">
                    {errorText}
                  </li>
                </div>
              ) : (
                ""
              )}
            </form>
          </li>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
