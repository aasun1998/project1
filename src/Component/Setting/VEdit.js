import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Redirect, useParams } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";

const VEdit = () => {
  const params = useParams();

  const { setting } = useContext(Context);
  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [userDetails, setUserDetails] = useState({
    carVehicle: setting != null ? setting.carVehicle : "",
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
      .put("/setting/vehicle/update", {
        carVehicle: userDetails.carVehicle,
        _id: params.id,
      })
      .then((result) => {
        console.log("fff", result);
        setUserDetails({
          carVehicle: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  if (setting == null) {
    return <Redirect to="/vehiclesetting" />;
  }

  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Edit Vehicle</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Vehicle
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter carVehicle"
                id="carVehicle"
                value={userDetails.carVehicle}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <br />
        <button
          onClick={onSave}
          style={{ width: "200px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default VEdit;
