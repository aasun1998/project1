import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Redirect, useParams } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";

const AdminEdit = () => {
  const params = useParams();

  const { profile } = useContext(Context);

  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [userDetails, setUserDetails] = useState({
    email: profile != null ? profile.email : "",
    fName: profile != null ? profile.fName : "",
    lName: profile != null ? profile.lName : "",
    address: profile != null ? profile.address : "",
    phone: profile != null ? profile.phone : "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    instance
      .put(
        "/all/admin/update",
        {
          email: userDetails.email,
          fName: userDetails.fName,
          lName: userDetails.lName,
          address: userDetails.address,
          phone: userDetails.phone,
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
        setUserDetails({
          email: "",
          fName: "",
          lName: "",
          address: "",
          phone: "",
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
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <div style={{ width: "300px" }} className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="F Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            id="fName"
            value={userDetails.fName}
            onChange={handleChange}
          />
        </div>
        {/* <br/> */}

        <div style={{ width: "300px" }} className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="L Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            id="lName"
            value={userDetails.lName}
            onChange={handleChange}
          />
        </div>

        <div style={{ width: "300px" }} className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            id="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>

        <div style={{ width: "300px" }} className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            aria-label="Username"
            aria-describedby="basic-addon1"
            id="phone"
            value={userDetails.phone}
            onChange={handleChange}
          />
        </div>

        <div style={{ width: "300px" }} className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            aria-label="Username"
            aria-describedby="basic-addon1"
            id="address"
            value={userDetails.address}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={onSave}
          style={{ width: "100px" }}
          type="button"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AdminEdit;
