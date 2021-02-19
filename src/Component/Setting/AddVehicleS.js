import React, { useState } from "react";
import Header from "../Header/Header";
import { useAlert } from "react-alert";
import instance from "../../Instance";

const AddVehicleS = () => {
  const alert = useAlert();
  const [userDetails, setUserDetails] = useState({
    carVehicle: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    instance
      .post(
        "/api/vehicle/detail",
        {
          carVehicle: userDetails.carVehicle,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then((result) => {
        alert.success("Blog Added");
        setUserDetails({
          carVehicle: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

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
                placeholder="Enter car vehicle"
                id="carVehicle"
                value={userDetails.carVehicle}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <br />
        <button
          onClick={onAdd}
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

export default AddVehicleS;
