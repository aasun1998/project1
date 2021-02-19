import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "../Admin/Admin.css";
import "../Admin/util.css";
import { useParams } from "react-router-dom";
import instance from "../../Instance";

const NewPassword = () => {
  const history = useHistory();

  const handleHistory = () => {
    history.push("/");
  };

  const params = useParams();

  //   const { token } = useParams;
  //   console.log(token);
  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [userDetails, setUserDetails] = useState({
    password: "",
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
      .post(`/admin/new/password`, {
        password: userDetails.password,
        token: params.id,
      })
      .then((result) => {
        console.log("save", result);
        handleHistory();
        setUserDetails({
          password: "",
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
            <img src={cams} style={{ height: "200px", width: "300px" }} />
            <span
              class="login100-form-title p-b-41"
              style={{ color: "#02807C" }}
            >
              <b>New Password</b>
            </span>
            <form class="login100-form validate-form p-b-33 p-t-5">
              <h5 style={{ marginLeft: "10px" }} class="text-left">
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
                    placeholder="Enter your new password"
                    id="password"
                    value={userDetails.password}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
