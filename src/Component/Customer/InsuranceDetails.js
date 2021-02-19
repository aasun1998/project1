import React, { useEffect, useContext, useState } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import Context from "./Context";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import moment from "moment";
import "./Details.css";
import { useAlert } from "react-alert";
import instance from "../../Instance";

export default function InsuranceDetails() {
  const alert = useAlert();
  const history = useHistory();
  const params = useParams();
  const [loader, setloader] = useState(false);
  const [allleaddetails, setAllLeadDetails] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [reload, setReload] = useState(false);
  const [price, setPrice] = useState({
    reason: "",
  });
  const [vechile, setVechile] = useState([]);
  const [driver, setDriver] = useState([]);
  const { setCustomer } = useContext(Context);

  const [discount, setDiscount] = useState(-1);
  const [policy, setPolicy] = useState(null);
  const [card, setCard] = useState(null);
  useEffect(() => {
    console.log("id", params.id);
  }, []);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/customer/vd/view/${params.id}`)
      .then(({ data }) => {
        console.log("alldata", data?.data[0]);
        setAllLeadDetails(data?.data[0]);
        // setInsurance(data?.data[0].insuranceDetails);
        setVechile(data?.data[0]?.vehicleDetails);
        setDriver(data?.data[0]?.driversDetails);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [reload]);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/customer/details/view/${allleaddetails.customerId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("customerdatassss", data);
        setCard(data?.data[0]);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [allleaddetails.customerId]);

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

  const addVehicle = (id) => {
    history.push(`/addvehicle/${id}`);
  };

  const addDriver = (id) => {
    history.push(`/adddriver/${id}`);
  };
  const Payment = () => {
    history.push(`/payment`);
  };

  const dEdit = (value) => {
    setCustomer(value);
    history.push(`/driveredit/${value._id}`);
  };

  const iEdit = (allleaddetails) => {
    setCustomer(allleaddetails);
    history.push(`/insuranceedit/${allleaddetails._id}`);
  };

  const vEdit = (allleaddetails) => {
    setCustomer(allleaddetails);
    console.log(setCustomer);
    history.push(`/vehicleedit/${allleaddetails._id}`);
  };

  const handleChange = (event) => {
    setPrice({
      ...price,
      [event.target.id]: event.target.value,
    });
  };

  const Discount = () => {
    let digit = Number(allleaddetails?.premium);
    let dis = digit - discount;
    // call update api
    instance
      .put(
        "/customer/price/update",
        {
          _id: params.id,
          premium: dis,
          discount: discount,
          reason: price.reason,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then((result) => {
        console.log("update", result);
        setReload(!reload);
        alert.success("Discount Applied");
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const Discount5 = () => {
    let digit2 = Number(allleaddetails?.premium);
    let dis2 = digit2 * 0.03;
    setDiscount(dis2);
    // instance
    //   .get(`/insurance/view/${allleaddetails?.policyType}`, {
    //     headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
    //   })
    //   .then((data) => {
    //     console.log("insurance", data);
    //     setPolicy(data?.data?.policyData[0]);
    //     console.log(data?.data?.policyData[0]?.policyMonth);
    //   })
    //   .catch((err) => {
    //     console.log("Errr", err);
    //   });
  };
  const Discount10 = () => {
    let digit2 = Number(allleaddetails?.premium);
    let dis2 = digit2 * 0.05;
    setDiscount(dis2);
    instance
      .get(`/insurance/view/${allleaddetails?.policyType}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("insurance", data);
        setPolicy(data?.data?.policyData[0]);
        console.log(data?.data?.policyData[0]?.policyMonth);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };
  const Discount15 = () => {
    let digit2 = Number(allleaddetails?.premium);
    let dis2 = digit2 * 0.1;
    setDiscount(dis2);
    instance
      .get(`/insurance/view/${allleaddetails?.policyType}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("insurance", data);
        setPolicy(data?.data?.policyData[0]);
        console.log(data?.data?.policyData[0]?.policyMonth);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };
  const Discount20 = () => {
    let digit2 = Number(allleaddetails?.premium);
    let dis2 = digit2 * 0.15;
    setDiscount(dis2);
    instance
      .get(`/insurance/view/${allleaddetails?.policyType}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then((data) => {
        console.log("insurance", data);
        setPolicy(data?.data?.policyData[0]);
        console.log(data?.data?.policyData[0]?.policyMonth);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const SendMail = (e) => {
    e.preventDefault();
    // console.log("This is Addd");

    instance
      .post(`/send/email/pdf`, {
        email: card.email,
        pdf: allleaddetails.pdf,
      })
      .then((result) => {
        console.log("save", result);
        alert.success("Email is sent");
        // alert.success("Insurance Added");
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const handelDelite = (value, e) => {
    e.preventDefault();
    // setAllLeadDetails(allleaddetails?.insuranceDetails?.filter(temp=> temp._id!=value._id))
    setDriver(driver.filter((temp) => temp._id != value._id));
    alert.success("Driver Deleted");
    instance
      .post(`/history/driver/${value._id}`, {
        name: value.name,
        joinTime: value.createdAt,
        owner: card?.name,
        policyNo: allleaddetails?.policyNo,
        vehicle:
          vechile[0]?.regoNo +
          "," +
          vechile[0]?.make +
          "," +
          vechile[0]?.model +
          "," +
          vechile[0]?.color,
        mobile: value.mobile,
        address: value.address,
        post: value.post,
        suburb: value.suburb,
        birthdate: value.birthdate,
        licenceno: value.licenceno,
        licenceexpiry: value.licenceexpiry,
        customerId: value.customerId,
      })
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            userId: value.name,
            policyNo: allleaddetails?.policyNo,
            category: "Deleted Driver",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Delited Success");
          })
          .catch((err) => {
            console.log("Error in Delited", err);
          });
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-md-6">
                <div class="card">
                  <div class="card-body" style={{ fontSize: "17px" }}>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-left">
                          <b>Insurance Details:</b>
                        </label>
                      </div>
                      <div className="col-md-6 text-right">
                        <svg
                          onClick={() => iEdit(allleaddetails)}
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-pencil-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <form className="demo">
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            Policy No
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.policyNo}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            Policy Type
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.policyType}
                          </label>
                          <br />
                          <label
                            style={{ width: "200px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            Insurance Type
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.insuranceType}
                          </label>
                          <br />
                          <label
                            style={{ width: "200px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            Next Payment
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.nextPaymentDue}
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
                            Overdue
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.overdue}
                          </label>
                          <br />
                          <label
                            style={{ width: "200px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            Premium
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.premium}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            Excess
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.excess}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            Valuation Type
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.valuationType}
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
                            Period
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.period}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            Start Dtate
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="pwd"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.startDate}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            End Date
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.endDate}
                          </label>
                          <br />
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            Value Insured
                          </label>
                          <label
                            style={{ width: "300px" }}
                            htmlFor="email"
                            className="mr-sm-2"
                          >
                            {allleaddetails?.valueInsured}
                          </label>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div class="card">
                  <div class="card-body">
                    {/* <div className="row" style={{ paddingLeft: "60px" }}> */}
                    <button
                      onClick={Payment}
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                    >
                      Payment
                    </button>
                    <button
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-danger"
                    >
                      Send Link
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/policy/${allleaddetails.pdf}`)
                      }
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                    >
                      Policy
                    </button>

                    {/* <a
                   
                    type="button"
                    class="btn "
                    style={{ width: "300px", marginLeft: "5px" }}
                  >
                  
                  </a> */}
                    <button
                      style={{ width: "95px" }}
                      type="button"
                      class="btn btn-danger"
                      onClick={SendMail}
                    >
                      Email
                    </button>
                    {/* </div> */}
                    <br />
                    <br />

                    <div className="row">
                      <label style={{ paddingLeft: "20px" }}>
                        Apply Discount:{" "}
                      </label>
                    </div>
                    {/* <label for="exampleInputEmail1">Select Car</label>
    <select class="custom-select" id="car" value={price.car} onChange={handleChange}>
  <option value=''>Choose</option>
  {allleaddetails !== null && allleaddetails.vehicleDetails.map((value,i)=>(
  <option value="allleaddetails.policyNo-vechile.make-vechile.model-vechile.year-vechile.regoNo">{allleaddetails?.policyNo}-{vechile?.make}-{vechile?.model}-{vechile?.year}-{vechile?.regoNo}</option>
  ))}
</select> */}
                    <br />
                    <button
                      onClick={Discount5}
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      3%
                    </button>
                    <button
                      onClick={Discount10}
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      5%
                    </button>
                    <button
                      onClick={Discount15}
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      10%
                    </button>
                    <button
                      onClick={Discount20}
                      style={{ width: "100px" }}
                      type="button"
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      15%
                    </button>
                    {/* <label id="demo"></label> */}
                    <br />
                    <br />
                    <div class="input-group input-group-sm mb-3">
                      <h4>Reason:</h4>
                      <label style={{ width: "300px" }}>
                        {allleaddetails?.reason}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Reason"
                        id="reason"
                        value={price.reason}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={Discount}
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="card">
                  <div class="card-body" style={{ fontSize: "17px" }}>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-left">
                          <b>Vehicle Details:</b>
                        </label>
                      </div>
                      <div className="col-md-6 text-right">
                        <svg
                          onClick={() =>
                            vEdit(allleaddetails.vehicleDetails[0])
                          }
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-pencil-fill "
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      {vechile &&
                        vechile.map((value, i) => (
                          <div className="row" key={i}>
                            <div className="col-md-6">
                              <form className="demo">
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  Rego No
                                </label>
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  {value?.regoNo}
                                </label>
                                <br />
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="pwd"
                                  className="mr-sm-2"
                                >
                                  Vehicle Type
                                </label>
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="pwd"
                                  className="mr-sm-2"
                                >
                                  {value?.vehicleType}
                                </label>
                                <br />
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  Color
                                </label>
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  {value?.color}
                                </label>
                                <br />
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  Vin
                                </label>
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="email"
                                  className="mr-sm-2"
                                >
                                  {value?.vin}
                                </label>
                              </form>
                            </div>
                            <div className="col-md-6">
                              <form className="demo">
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
                                  {value?.year}
                                </label>
                                <br />
                                <label
                                  style={{ width: "200px" }}
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
                                  {value?.make}
                                </label>
                                <br />
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="pwd"
                                  className="mr-sm-2"
                                >
                                  Model
                                </label>
                                <label
                                  style={{ width: "300px" }}
                                  htmlFor="pwd"
                                  className="mr-sm-2"
                                >
                                  {value?.model}
                                </label>
                              </form>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-left">
                          <b>Driver Details:</b>
                        </label>
                      </div>
                      <div className="col-md-6 text-right">
                        <svg
                          onClick={() => addDriver(allleaddetails._id)}
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-plus-square-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                          />
                        </svg>
                      </div>
                      <br />
                    </div>

                    <div style={{ overflow: "scroll" }}>
                      <table className="table">
                        <thead style={{ backgroundColor: "#00a65a73" }}>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Date and Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Vehicle Type</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>
                            <th scope="col">Post</th>
                            <th scope="col">Suburb</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Lience No</th>
                            <th scope="col">Lience Expiery</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {driver &&
                            driver.map((value, i) => (
                              <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>
                                  {moment(new Date(value.createdAt)).format(
                                    "DD/MM/YYYY"
                                  )}
                                  <br />
                                  {new Date(
                                    value.createdAt
                                  ).toLocaleTimeString()}
                                </td>
                                <td>{value?.name}</td>
                                <td>{value?.vehicle}</td>
                                <td>{value?.mobile}</td>
                                <td>{value?.address}</td>
                                <td>{value?.post}</td>
                                <td>{value?.suburb}</td>
                                <td>{value?.birthdate}</td>
                                <td>{value?.licenceno}</td>
                                <td>{value?.licenceexpiry}</td>
                                <td>
                                  <svg
                                    onClick={() => dEdit(value)}
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    class="bi bi-pencil-fill"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                                    />
                                  </svg>
                                  <br />
                                  <svg
                                    onClick={(e) => handelDelite(value, e)}
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    class="bi bi-archive-fill"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"
                                    />
                                  </svg>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
