import React from "react";
import { useHistory } from "react-router";

const LoginWidget = ({ message }) => {
  const history = useHistory();
  const loginHandler = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  return (
    <div className="list-group-item text-capitalize my-1 my-md-2 my-lg-2 mx-2">
      <form onSubmit={loginHandler}>
        <div className="row">
          <div className="input-group col-12  my-1 mr-auto">
            <button
              type="submit"
              className="btn submit-button mx-3 col-5 mx-auto"
            >
              {message}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginWidget;
