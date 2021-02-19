import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import Context from "../Profile/Context";
import { Redirect, useParams } from "react-router-dom";
import instance from "../../Instance";

const ChangePassword = () => {
  const params = useParams();
  const { profile } = useContext(Context);

  const [userDetails, setUserDetails] = useState({
    password: "",
  });

  useEffect(() => {
    console.log("id", profile);
  }, []);

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    instance
      .put(
        "/admin/password/update",
        {
          password: userDetails.password,
          email: profile.email,
          _id: params.id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then((result) => {
        console.log("fff", result);
        instance
          .post(`/add/notification`, {
            // userId: allleaddetails.name,
            // policyNo: policyNo,
            category: "Changed his password",
            adminId: profile?.fName + " " + profile?.lName,
          })
          .then(() => {
            console.log("Added Success");
          })
          .catch((err) => {
            console.log("Error in Added", err);
          });
        setUserDetails({
          password: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  if (profile == null) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Change Your Password</h2>
        <div class="col-auto">
          <div class="input-group col-md-4 mb-4">
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
              class="form-control"
              placeholder="Enter your new password"
              style={{ width: "300px" }}
              value={userDetails.password}
              onChange={handleChange}
              autocomplete="off"
              required
            ></input>
          </div>
        </div>
        <button
          onClick={onSave}
          style={{ width: "100px" }}
          type="button"
          class="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
