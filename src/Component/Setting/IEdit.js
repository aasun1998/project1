import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Redirect, useParams } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";

const IEdit = () => {
  const params = useParams();

  const { setting } = useContext(Context);
  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [userDetails, setUserDetails] = useState({
    policyName: setting != null ? setting.policyName : "",
    policyType: setting != null ? setting.policyType : "",
    policyMonth: setting != null ? setting.policyMonth : "",
    policyDetail: setting != null ? setting.policyDetail : "",
    packageName: setting != null ? setting.packageName : "",
    excess: setting != null ? setting.excess : "",
    pPrice: setting != null ? setting.pPrice : "",
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
        "/setting/insurance/update",
        {
          policyName: userDetails.policyName,
          policyType: userDetails.policyType,
          policyMonth: userDetails.policyMonth,
          policyDetail: userDetails.policyDetail,
          packageName: userDetails.packageName,
          excess: userDetails.excess,
          pPrice: userDetails.pPrice,
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

  if (setting == null) {
    return <Redirect to="/vehiclesetting" />;
  }

  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Edit Insurance</h2>
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
          onClick={onSave}
          style={{ width: "300px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default IEdit;
