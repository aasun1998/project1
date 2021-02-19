import React, { useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "../Admin/Admin.css";
import "../Admin/util.css";
import instance from "../../Instance";

const UserLogin = () => {
  const history = useHistory();
  const Reset = () => {
    history.push("/ureset");
  };

  const handleHistory = () => {
    history.push("/udashboard");
  };
  const [wrong, setWrong] = useState(false);
  const [errors, setErrors] = useState({
    userNameError: false,
    passwordError: false,
  });

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const HandleValidation = (e) => {
    e.preventDefault();
    console.log("DDDDDDDDDD");
    if (userDetails.email === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          userNameError: true,
          passwordError: false,
        };
      });

      if (userDetails.password === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            passwordError: true,
          };
        });
      }
    } else if (userDetails.password === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          userNameError: false,
          passwordError: true,
        };
      });
    } else {
      onSubmitSignIn(e);
    }
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    instance
      .post("/user/login", {
        email: userDetails.email,
        password: userDetails.password,
      })
      .then(({ data }) => {
        console.log("save", data);
        localStorage.setItem("token$", data?.data?.token);
        handleHistory();
        setWrong(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setWrong(true);
      });
  };

  return (
    <div className="admin">
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            {/* <span class="login100-form-title p-b-41">CAMS CLUB</span> */}
            <img src={cams} style={{ height: "200px", width: "300px" }} />
            <span
              class="login100-form-title p-b-41"
              style={{ color: "#02807C" }}
            >
              <b>User Login</b>
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
              {wrong && (
                <label style={{ color: "red" }}>
                  {/* Wrong UserName & Wrong Password <br /> */}
                  Please Enter Right Username & Right Password
                </label>
              )}
              <h5 style={{ marginLeft: "10px" }} class="text-left">
                Username
              </h5>
              {errors.userNameError && (
                <label style={{ color: "red" }}>Enter Your Username</label>
              )}
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div style={{ height: "33px" }} class="input-group-text">
                      @
                    </div>
                  </div>
                  <input
                    name="email"
                    type="text"
                    className={
                      errors.userNameError === true
                        ? "form-control error_border"
                        : "form-control"
                    }
                    // class="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Username"
                    value={userDetails.email}
                    onChange={handelChange}
                    autocomplete="off"
                    required
                  ></input>
                </div>
              </div>
              <h5 style={{ marginLeft: "10px" }} class="text-left">
                Password
              </h5>
              {errors.passwordError && (
                <label style={{ color: "red" }}>Enter Your Password</label>
              )}
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
                    type="password"
                    className={
                      errors.passwordError === true
                        ? "form-control error_border"
                        : "form-control"
                    }
                    // class="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Password"
                    value={userDetails.password}
                    onChange={handelChange}
                    autocomplete="off"
                    required
                  ></input>
                </div>
              </div>

              <div class="container-login100-form-btn m-t-32">
                <button
                  style={{
                    width: "200px",
                    color: "white",
                    backgroundColor: "#DE0614",
                  }}
                  onClick={HandleValidation}
                  class="login100-form-btn"
                >
                  Login
                </button>
                <br />
                <label
                  style={{
                    width: "200px",
                    color: "#DE0614",
                  }}
                  onClick={Reset}
                  class="login100-form"
                >
                  Forgot Password
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
