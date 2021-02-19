import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import "./Details.css";
import { useHistory } from "react-router-dom";
import instance from "../../Instance";
import moment from "moment";
import { useAlert } from "react-alert";

export default function Details() {
  const alert = useAlert();
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const [details, setDetails] = useState(false);
  const params = useParams();

  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [allleaddetails, setAllLeadDetails] = useState(null);

  const [policy, setPolicy] = useState(null);

  const [userDetails, setUserDetails] = useState({
    reason: "",
  });

  const [discount, setDiscount] = useState(-1);
  // useEffect(()=>{
  // document.getElementsById("reason").value=userDetails.reason;
  // },[])
  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const [oneview, setOneView] = useState(null);
  useEffect(() => {
    instance
      .get(`/one/admin/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("admin", data);
        setOneView(data?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/lead/note/view/${params.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        setAllLeadDetails(data?.data[0]);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [details]);

  const Discount = () => {
    let digit = Number(allleaddetails?.packagePrice);
    let dis = digit - discount;
    // call update api
    instance
      .put(
        "/lead/price/update",
        {
          _id: params.id,
          packagePrice: dis,
          discount: discount,
          reason: userDetails.reason,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then((result) => {
        console.log("update", result);
        setDetails(!details);
        alert.success("Discount Applied");
        instance
          .post(`/add/notification`, {
            userId: allleaddetails?.firstName,
            category: "Discount Applied",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Added Success");
          })
          .catch((err) => {
            console.log("Error in Added", err);
          });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  // console.log("demo", userDetails.reason);

  const payment = () => {
    history.push("/payment");
  };

  const getPolicy5 = () => {
    let digit2 = Number(allleaddetails?.packagePrice);
    setDiscount(digit2 * 0.03);

    instance
      .get(`/leadhistory/view/${allleaddetails?.package}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("gdhdhsg", data);
        setPolicy(data?.data?.policyData[0]);
        //   console.log(data?.data?.policyData[0]?.policyMonth);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const getPolicy10 = () => {
    let digit2 = Number(allleaddetails?.packagePrice);
    setDiscount(digit2 * 0.05);

    instance
      .get(`/leadhistory/view/${allleaddetails?.package}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("gdhdhsg", data);
        setPolicy(data?.data?.policyData[0]);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const getPolicy15 = () => {
    let digit2 = Number(allleaddetails?.packagePrice);
    setDiscount(digit2 * 0.1);

    instance
      .get(`/leadhistory/view/${allleaddetails?.package}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("gdhdhsg", data);
        setPolicy(data?.data?.policyData[0]);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const getPolicy20 = () => {
    let digit2 = Number(allleaddetails?.packagePrice);
    setDiscount(digit2 * 0.15);

    instance
      .get(`/leadhistory/view/${allleaddetails?.package}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("gdhdhsg", data);
        setPolicy(data?.data?.policyData[0]);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const notes = (id) => {
    history.push(`/notes/${id}`);
  };
  return (
    <div>
      <Header />

      <div
        className="main-content-wrap sidenav-open d-flex flex-column"
        style={{ backgroundColor: "#E8ECF1" }}
      >
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div
                  className="card-body"
                  style={{ margin: "10px", fontSize: "20px" }}
                >
                  <div className="row">
                    <label>
                      <b>Overview</b>
                    </label>
                    <br />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          FirstName
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.firstName}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Email
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.email}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Policy Date
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.date}
                        </label>
                      </form>
                    </div>
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Middle Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.middleName}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Mobile
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.phone}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Model
                        </label>

                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.model}
                        </label>
                      </form>
                    </div>
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Last Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.lastName}
                        </label>

                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Make
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.make}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Year
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.year}
                        </label>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Body
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.body}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Pin
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.post}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Policy Type
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.policyType}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Driver First Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.dFName1}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Driver Last Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.dLname2}
                        </label>
                      </form>
                    </div>
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Color
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.color}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Package
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.package}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Insurance Type
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.insurance}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Driver Last Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.dLName1}
                        </label>
                      </form>
                    </div>
                    <div className="col-md-4">
                      <form className="demo">
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          State
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.state}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Suburb
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.suburb}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Price
                        </label>
                        <label
                          className={
                            allleaddetails?.packagePrice === 150
                              ? "text-dark"
                              : "text-success"
                          }
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.packagePrice}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Driver First Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.dFName2}
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  {/* <div className="row plink"> */}
                  <button
                    onClick={payment}
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-success"
                  >
                    Payment
                  </button>
                  <button
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-danger"
                  >
                    Send Link
                  </button>
                  {/* </div> */}
                  <br />
                  <div className="row">
                    <label>Apply Discount: </label>
                    <br />
                    <br />
                  </div>
                  <button
                    onClick={getPolicy5}
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    3%
                  </button>
                  <button
                    onClick={getPolicy10}
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    5%
                  </button>
                  <button
                    onClick={getPolicy15}
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    10%
                  </button>
                  <button
                    onClick={getPolicy20}
                    style={{ width: "100px" }}
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    15%
                  </button>
                  <br />
                  <label id="demo"></label>
                  <br />
                  <div className="input-group input-group-sm mb-3">
                    <br />
                    <br />
                    <h4>Reason:</h4>
                    <label style={{ width: "300px" }}>
                      {allleaddetails?.reason}
                    </label>
                    <br />
                  </div>

                  <div className="row container">
                    <div className="col-md-6">
                      <h5 className="card-title text-left">Notes</h5>
                    </div>
                    <div className="col-md-6 text-right">
                      <svg
                        onClick={() => notes(allleaddetails._id)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-card-list "
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                        />
                        <circle cx="3.5" cy="5.5" r=".5" />
                        <circle cx="3.5" cy="8" r=".5" />
                        <circle cx="3.5" cy="10.5" r=".5" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ overflow: "scroll" }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Note</th>
                          <th scope="col">Created Date and Time</th>
                          <th scope="col">Date</th>
                          <th scope="col">Created By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allleaddetails !== null &&
                          allleaddetails.leadDetails.map((value, i) => (
                            <tr key={i}>
                              <th>{value?.note}</th>
                              <td>
                                {moment(new Date(value.createdAt)).format(
                                  "DD/MM/YYYY"
                                )}
                                <br />
                                {new Date(value.createdAt).toLocaleTimeString()}
                              </td>
                              <td>{value?.date}</td>
                              <td>{oneview != null ? oneview.fName : null}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Discount
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Reason"
                            id="reason"
                            value={userDetails.reason}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            onClick={Discount}
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <button style={{width: '200px'}} type="button" className="btn btn-outline-primary">Add Insurance Claim</button>
      <label>Insurance Claim Details</label>
      <button style={{width: '200px'}} type="button" className="btn btn-outline-secondary">Add Insurance Billing</button>
      <label>Billing Details</label> */}
      </div>
    </div>
  );
}
