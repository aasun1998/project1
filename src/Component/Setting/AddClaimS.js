import React, { useState } from "react";
import Header from "../Header/Header";
import { useAlert } from "react-alert";
import instance from "../../Instance";

const AddClaimS = () => {
  const alert = useAlert();
  const [userDetails, setUserDetails] = useState({
    claimStatus: "",
    claimFault: "",
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
        "/add/claim/setting",
        {
          claimStatus: userDetails.claimStatus,
          claimFault: userDetails.claimFault,
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
          claimStatus: "",
          claimFault: "",
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
        <h2>Edit Claim</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Claim Status
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter claim status"
                id="claimStatus"
                value={userDetails.claimStatus}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Claim Fault
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter claim fault"
                id="claimFault"
                value={userDetails.claimFault}
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

export default AddClaimS;
