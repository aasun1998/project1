import React, { useState } from "react";
import Header from "../Header/Header";
import { useAlert } from "react-alert";
import instance from "../../Instance";

const AddInsuranceS = () => {
  const alert = useAlert();
  const [userDetails, setUserDetails] = useState({
    policyName: "",
    policyType: "",
    policyMonth: "",
    policyDetail: "",
    packageName: "",
    excess: "",
    pPrice: "",
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
        "/api/policy/detail",
        {
          policyName: userDetails.policyName,
          policyType: userDetails.policyType,
          policyMonth: userDetails.policyMonth,
          policyDetail: userDetails.policyDetail,
          packageName: userDetails.packageName,
          excess: userDetails.excess,
          pPrice: userDetails.pPrice,
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
          policyName: "",
          policyType: "",
          policyMonth: "",
          policyDetail: "",
          packageName: "",
          excess: "",
          pPrice: "",
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
        <h2>Add Insurance</h2>
        <div className="row">
          <div className="col-md-4">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Policy Name
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter policy name"
                id="policyName"
                value={userDetails.policyName}
                onChange={handleChange}
              />
              <br />
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Policy Month
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter policy month"
                id="policyMonth"
                value={userDetails.policyMonth}
                onChange={handleChange}
              />
              <br />
              {/* <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Policy Type
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter policy type"
                id="policyType"
                value={userDetails.policyType}
                onChange={handleChange}
              /> */}
            </form>
          </div>
          <div className="col-md-4">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Policy Detail
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter policy detail"
                id="policyDetail"
                value={userDetails.policyDetail}
                onChange={handleChange}
              />
              <br />
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Package Name
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter package name"
                id="packageName"
                value={userDetails.packageName}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-4">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Excess
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter excess"
                id="excess"
                value={userDetails.excess}
                onChange={handleChange}
              />
              <br />
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Policy Price
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter policy price"
                id="pPrice"
                value={userDetails.pPrice}
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

export default AddInsuranceS;
