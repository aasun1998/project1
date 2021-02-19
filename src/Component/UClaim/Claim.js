import React, { useEffect, useState } from "react";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";
import { useHistory } from "react-router-dom";

const Claim = () => {
  const history = useHistory();
  const [oneview, setOneView] = useState([]);
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
            setOneView(data?.data[0]?.claimDetails);
            setAdd(data?.data[0]?._id);
            console.log(data?.data[0]?.insuranceDetails[0]?._id);
            instance
              .get(
                `/customer/vd/view/${data?.data[0]?.insuranceDetails[0]?._id}`
              )
              .then(({ data }) => {
                console.log("data", data);
                setloader(false);
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

  const AddClaim = (add) => {
    history.push(`/uaddclaim/${add}`);
  };

  const ClaimDetails = (id) => {
    history.push(`/uclaimdetails/${id}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h3>Claim Details</h3>
        <button
          onClick={() => AddClaim(add)}
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
          <div style={{ overflowX: "scroll" }}>
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#00a65a73" }}>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Claim No</th>
                  <th scope="col">Policy No</th>
                  <th scope="col">Company</th>
                  <th scope="col">Date</th>
                  <th scope="col">Fault</th>
                  <th scope="col">Claim Certificate</th>
                </tr>
              </thead>
              <tbody>
                {oneview &&
                  oneview.map((value, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        {" "}
                        <a onClick={() => ClaimDetails(value._id)}>
                          {value.claimNo}
                        </a>
                      </td>

                      <td>
                        {" "}
                        <a onClick={() => ClaimDetails(value._id)}>
                          {value.aPolicyNo}
                        </a>
                      </td>

                      <td>
                        {" "}
                        <a onClick={() => ClaimDetails(value._id)}>
                          {value.company}
                        </a>
                      </td>

                      <td>
                        {" "}
                        <a onClick={() => ClaimDetails(value._id)}>
                          {value.date}
                        </a>
                      </td>

                      <td>
                        {" "}
                        <a onClick={() => ClaimDetails(value._id)}>
                          {value.fault}
                        </a>
                      </td>

                      <td>
                        <a
                          href={`http://31.220.56.233/backend/public/claim/${value.pdf}`}
                          style={{
                            width: "100px",
                            color: "white",
                            backgroundColor: "#DE0614",
                          }}
                          type="button"
                          class="btn btn-primary"
                        >
                          Certificate
                        </a>
                        {/* 
                      <button
                        href={`http://31.220.56.233/backend/public/policy/${value.pdf}`}
                        style={{
                          width: "100px",
                        }}
                        type="button"
                        class="btn btn-primary"
                      >
                        Certificate
                      </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Claim;
