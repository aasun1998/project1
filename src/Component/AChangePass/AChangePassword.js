import React, { useState, useEffect, useContext } from "react";
import Header from "../UDashboardHeader/DashboardHeader";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import instance from "../../Instance";

const UserChangePassword = () => {
  const params = useParams();

  const [oneview, setOneView] = useState(null);
  const history = useHistory();
  useEffect(() => {
    instance
      .get(`/one/user/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("user", data);
        setOneView(data?.user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [userDetails, setUserDetails] = useState({
    password: "",
  });

  //   useEffect(() => {
  //     console.log("id", profile);
  //   }, []);

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
        "/user/password/update",
        {
          password: userDetails.password,
          email: oneview.email,
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
            adminId: oneview?.name,
          })
          .then(() => {
            console.log("Added Success");
          })
          .catch((err) => {
            console.log("Error in Added", err);
          });
        history.push(`/uprofile`);
        setUserDetails({
          password: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

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

export default UserChangePassword;
