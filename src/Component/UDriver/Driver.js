import React, { useEffect, useState } from "react";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";
import { useHistory } from "react-router-dom";

const Driver = () => {
  const history = useHistory();
  const [oneview, setOneView] = useState([]);
  const [add, setAdd] = useState([]);

  useEffect(() => {
    instance
      .get(`/one/user/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("user", data);
        instance
          .get(`/customer/details/view/${data?.user?._id}`)
          .then(({ data }) => {
            console.log("customerdata", data);
            console.log(data?.data[0]?.insuranceDetails[0]?._id);
            setAdd(data?.data[0]?.insuranceDetails[0]?._id);
            instance
              .get(
                `/customer/vd/view/${data?.data[0]?.insuranceDetails[0]?._id}`
              )
              .then(({ data }) => {
                console.log("data", data);
                setOneView(data?.data[0]?.driversDetails);
              })
              .catch((err) => {
                console.log("err", err);
              });
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const AddDriver = (add) => {
    history.push(`/adddriver/${add}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h3>Driver Details</h3>
        <button
          onClick={() => AddDriver(add)}
          style={{ width: "100px" }}
          type="button"
          class="btn btn-primary"
        >
          Add
        </button>
        <br />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Vehicle</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Suburb</th>
              <th scope="col">Post</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Licence Number</th>
              <th scope="col">Licence Expiry</th>
            </tr>
          </thead>
          <tbody>
            {oneview &&
              oneview.map((value, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{value.name}</td>
                  <td>{value.vehicle}</td>
                  <td>{value.mobile}</td>
                  <td>{value.address}</td>
                  <td>{value.suburb}</td>
                  <td>{value.post}</td>
                  <td>{value.birthdate}</td>
                  <td>{value.licenceno}</td>
                  <td>{value.licenceexpiry}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Driver;
