import React, { useEffect, useState } from "react";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";
import { useHistory } from "react-router-dom";

const Insurance = () => {
  const history = useHistory();
  const [oneview, setOneView] = useState([]);
  const [driver, setDriver] = useState([]);
  // const [pdf, setPdf] = useState([]);
  const [add, setAdd] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
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
            setAdd(data?.data[0]?._id);
            setOneView(data?.data[0]?.insuranceDetails);
            setloader(false);
            // setPdf(data?.data[0]?.insuranceDetails?.pdf);
            // console.log(data?.data[0]?.pdf);
            instance
              .get(`/customer/vd/view/${data?.data[0]?.insuranceDetails?._id}`)
              .then(({ data }) => {
                console.log("data", data);
                setDriver(data?.data[0]?.vehicleDetails);
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

  const AddInsurance = (add) => {
    history.push(`/uaddinsurance/${add}`);
  };

  const Vehicle = (id) => {
    history.push(`/uvehicle/${id}`);
  };

  const addDriver = (id) => {
    history.push(`/uadddriver/${id}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h3>Insurance Details</h3>
        <button
          onClick={() => AddInsurance(add)}
          style={{ width: "100px" }}
          type="button"
          class="btn btn-success"
        >
          Add
        </button>
        <br />
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <table class="table table-bordered">
            <thead style={{ backgroundColor: "#00a65a73" }}>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">PolicyNo</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>

                <th scope="col">PolicyType</th>
                <th scope="col">Insurance Type</th>
                <th scope="col">Premium</th>
                {/* <th scope="col">Next Payment Due</th>
              <th scope="col">Overdue</th> */}
                <th scope="col">Primium Period</th>
                <th scope="col">Excess</th>
                <th scope="col">Discount</th>
                <th scope="col">Reason</th>
                <th scope="col">Policy Certificate</th>
                <th scope="col">Driver</th>
              </tr>
            </thead>
            <tbody>
              {oneview &&
                oneview.map((value, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.policyNo}</a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>
                        {value.startDate}
                      </a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.endDate}</a>
                    </td>

                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>
                        {value.policyType}
                      </a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>
                        {value.insuranceType}
                      </a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.premium}</a>
                    </td>
                    {/* <td>{value.nextPaymentDue}</td>
                  <td>{value.overdue}</td> */}
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.period}</a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.excess}</a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.discount}</a>
                    </td>
                    <td>
                      {" "}
                      <a onClick={() => Vehicle(value._id)}>{value.reason}</a>
                    </td>

                    <td>
                      {" "}
                      <a
                        href={`http://31.220.56.233/backend/public/policy/${value.pdf}`}
                        style={{
                          width: "100px",
                          color: "white",
                          backgroundColor: "#DE0614",
                        }}
                        type="button"
                        class="btn btn-danger"
                      >
                        Certificate
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => Vehicle(value._id)}
                        type="button"
                        class="btn btn-danger"
                        style={{ color: "white", backgroundColor: "#DE0614" }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {/* <h3>Vehicle Details</h3>

        <br />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Rego No</th>
              <th scope="col">State</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Make</th>
              <th scope="col">Model</th>
              <th scope="col">Engine No</th>
              <th scope="col">Color</th>
              <th scope="col">Vin</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {driver &&
              driver.map((value, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{value.regoNo}</td>
                  <td>{value.state}</td>
                  <td>{value.vehicleType}</td>
                  <td>{value.make}</td>
                  <td>{value.model}</td>
                  <td>{value.engineNo}</td>
                  <td>{value.color}</td>
                  <td>{value.vin}</td>
                  <td>{value.year}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default Insurance;
