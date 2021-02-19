import React, { useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "../Admin/Admin.css";
import "../Admin/util.css";
import instance from "../../Instance";

const ForgotPassword = () => {
  const history = useHistory();

  const handleHistory = () => {
    history.push("/");
  };

  const [userDetails, setUserDetails] = useState({
    email: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("This is Addd");

    instance
      .post(`/admin/reset/password`, {
        email: userDetails.email,
      })
      .then((result) => {
        console.log("save", result);
        setUserDetails({
          email: "",
        });
        // alert.success("Insurance Added");
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };
  return (
    <div className="admin">
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            {/* <span class="login100-form-title p-b-41">CAMS CLUB</span> */}
           
            <span
              class="login100-form-title p-b-41"
              style={{ color: "#02807C" }}
            >
              <b>Forgot Password</b>
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
              <h5 style={{ marginLeft: "10px" }} class="text-left">
                Username
              </h5>
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div style={{ height: "33px" }} class="input-group-text">
                      @
                    </div>
                  </div>
                  <input
                    name="userName"
                    type="text"
                    class="form-control"
                    placeholder="Enter your username"
                    id="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    autocomplete="off"
                  ></input>
                </div>
              </div>
              {/* <h5 style={{ marginLeft: "10px" }} class="text-left">
                Password
              </h5>
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <img
                        style={{ width: "20px" }}
                        src="https://cdn3.iconfinder.com/data/icons/fillies-large/64/lock-512.png"
                      ></img>
                    </div>
                  </div>
                  <input
                    name="password"
                    type="text"
                    class="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Password"
                    value={adminDetails.password}
                    onChange={handelChange}
                    autocomplete="off"
                  ></input>
                </div>
              </div> */}

              <div class="container-login100-form-btn m-t-32">
                <button
                  style={{
                    width: "200px",
                    color: "white",
                    backgroundColor: "#DE0614",
                  }}
                  onClick={onSubmit}
                  class="login100-form-btn"
                >
                  Submit
                </button>
                <br />
                <label
                  style={{
                    width: "200px",
                    color: "#DE0614",
                  }}
                  onClick={handleHistory}
                  class="login100-form"
                >
                  Log In
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
