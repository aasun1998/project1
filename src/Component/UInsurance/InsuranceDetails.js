import React, { useEffect, useContext, useState } from "react";
// import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";
// import Context from "./Context";
import { useAlert } from "react-alert";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Insurance.css";
import ReactCardFlip from "react-card-flip";
const QRCode = require("qrcode.react");

// import instance from "../../Instance";

const InsuranceDetails = () => {
  const alert = useAlert();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loader, setloader] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const history = useHistory();
  const params = useParams();
  const [allleaddetails, setAllLeadDetails] = useState([]);
  const [allleadfilter, setAllLeadFilter] = useState([]);
  const [reload, setReload] = useState(false);
  const [price, setPrice] = useState({
    reason: "",
  });
  const [vechile, setVechile] = useState([]);
  const [driver, setDriver] = useState([]);
  //   const { setCustomer } = useContext(Context);

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
        setVechile(data?.data[0]?.vehicleDetails);
        setDriver(data?.data[0]?.driversDetails);
        setAllLeadFilter(data?.data[0]?.driversDetails);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`/customer/details/view/${params.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("customerdatassss", data);
        // setCard(data?.data[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [oneview, setOneView] = useState(null);

  useEffect(() => {
    instance
      .get(`/one/user/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("user", data);
        setOneView(data?.user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handelDelite = async (value, e) => {
    setDriver(driver.filter((temp) => temp._id != value._id));
    setAllLeadFilter(allleadfilter.filter((temp) => temp._id != value._id));
    alert.success("Driver Deleted");
    await instance
      .post(`/history/driver/${value._id}`, {
        name: value.name,
        joinTime: value.createdAt,
        owner: oneview?.name,
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
        console.log("Sucesss Delite");
        instance
          .post(`/add/notification`, {
            userId: value?.name,
            category: "Deleted Driver",
            adminId: oneview?.name,
          })
          .then(() => {
            console.log("Deleted Success");
          })
          .catch((err) => {
            console.log("Error in Deleted", err);
          });
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  const addDriver = (id) => {
    history.push(`/uadddriver/${id}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div className="row" style={{ paddingLeft: "20px" }}>
                    <label>
                      <b>Vehicle Details:</b>
                    </label>
                  </div>
                  <br />
                  <div>
                    {vechile &&
                      vechile.map((value, i) => (
                        <div
                          className="row"
                          style={{ justifyContent: "center" }}
                          key={i}
                        >
                          <div className="col-md-4">
                            <form className="">
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
                          <div className="col-md-4">
                            <form className="">
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
                          <div className="col-md-4">
                            <form className="">
                              <br />
                              {/* <label
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
                            </label> */}
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
                <div
                  class="card-body"
                  style={{
                    display: "flex",
                    placeItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="text-center" style={{ marginLeft: "30px" }}>
                    <ReactCardFlip
                      isFlipped={isFlipped}
                      flipDirection="vertical"
                    >
                      <div>
                        <div>
                          <div
                            class="card text-white mb-3"
                            style={{
                              width: "22rem",
                              height: "15rem",
                              background:
                                allleaddetails?.package === "GOLD" ||
                                allleaddetails?.package === "Gold" ||
                                allleaddetails?.package === "gold"
                                  ? "linear-gradient(180deg, rgba(245,197,107,1) 0%, rgba(240,214,10,1) 100%)"
                                  : allleaddetails.package === "SILVER" ||
                                    allleaddetails.package === "Silver" ||
                                    allleaddetails.package === "silver"
                                  ? "linear-gradient(180deg, rgba(219,216,211,1) 0%, rgba(228,227,214,1) 100%)"
                                  : "linear-gradient(180deg, rgba(149,146,140,1) 0%, rgba(103,102,89,1) 100%)",
                            }}
                          >
                            <h5
                              class="card-title"
                              style={{
                                position: "absolute",
                                top: "8px",
                                left: "16px",
                              }}
                            >
                              Cams Club
                            </h5>
                            <div class="card-body">
                              <img
                                style={{
                                  width: "150px",
                                  position: "absolute",
                                  bottom: "25px",
                                  opacity: 0.99,
                                  right: "15px",
                                  color: "black",
                                }}
                                src={cams}
                              />
                              <h5
                                class="card-title"
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "16px",
                                  color: "black",
                                }}
                              >
                                {allleaddetails?.package}
                              </h5>

                              <p
                                class="text-left"
                                style={{
                                  position: "absolute",
                                  bottom: "70px",
                                  left: "16px",
                                  color: "black",
                                }}
                              >
                                Member Number
                              </p>

                              <p
                                class="text-left"
                                style={{
                                  position: "absolute",
                                  bottom: "50px",
                                  left: "16px",
                                  color: "black",
                                }}
                              >
                                {allleaddetails?.cardNo}
                              </p>

                              <p
                                class="text-left"
                                style={{
                                  position: "absolute",
                                  bottom: "30px",
                                  left: "16px",
                                  color: "black",
                                }}
                              >
                                {oneview?.name}
                              </p>
                              <p
                                class="text-left"
                                style={{
                                  position: "absolute",
                                  bottom: "8px",
                                  left: "16px",
                                  color: "black",
                                }}
                              >
                                Valid UpTo: {allleaddetails.validity}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          style={{ marginRight: "30px" }}
                          onClick={handleClick}
                        >
                          Back Side
                        </button>
                      </div>

                      <div>
                        <div>
                          <div
                            class="card text-white bg-warning mb-3"
                            style={{
                              width: "22rem",
                              height: "15rem",
                              background:
                                allleaddetails?.package === "GOLD" ||
                                allleaddetails?.package === "Gold" ||
                                allleaddetails?.package === "gold"
                                  ? "linear-gradient(180deg, rgba(245,197,107,1) 0%, rgba(240,214,10,1) 100%)"
                                  : allleaddetails.package === "SILVER" ||
                                    allleaddetails.package === "Silver" ||
                                    allleaddetails.package === "silver"
                                  ? "linear-gradient(180deg, rgba(219,216,211,1) 0%, rgba(228,227,214,1) 100%)"
                                  : "linear-gradient(180deg, rgba(149,146,140,1) 0%, rgba(103,102,89,1) 100%)",
                            }}
                          >
                            <h5
                              class="card-title"
                              style={{
                                position: "absolute",
                                top: "8px",
                                left: "16px",
                              }}
                            >
                              Cams Club
                            </h5>
                            <div class="card-body">
                              <h5
                                class="card-title"
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "16px",
                                }}
                              >
                                {allleaddetails?.package}
                              </h5>

                              <QRCode
                                value={`Cams Club\n${allleaddetails.cardNo}\n${allleaddetails.package}\n${allleaddetails.validity}`}
                                size={180}
                                style={{
                                  marginLeft: "105px",
                                  position: "absolute",
                                  bottom: "8px",
                                  right: "90px",
                                }}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"L"}
                                includeMargin={false}
                                renderAs={"svg"}
                                // imageSettings={{
                                //   src: "https://static.zpao.com/favicon.png",
                                //   x: null,
                                //   y: null,
                                //   height: 24,
                                //   width: 24,
                                //   excavate: true,
                                // }}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          style={{ marginRight: "30px" }}
                          onClick={handleClick}
                        >
                          Front Side
                        </button>
                      </div>
                    </ReactCardFlip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <br />
        <div className="row">
          <div className="col-md-12">
            <div class="card" style={{ padding: "0px" }}>
              <div class="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    {" "}
                    <label>
                      <b>Driver Details:</b>
                    </label>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => addDriver(allleaddetails._id)}
                      type="button"
                      class="btn btn-success float-right"
                    >
                      ADD
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: "scroll" }}>
                  <table className="table">
                    <thead style={{ backgroundColor: "#00a65a73" }}>
                      <tr>
                        <th scope="col">Id</th>
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
                              <button
                                onClick={(e) => handelDelite(value, e)}
                                style={{
                                  width: "100px",
                                  color: "white",
                                  backgroundColor: "#DE0614",
                                }}
                                type="button"
                                class="btn"
                              >
                                Delete
                              </button>
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
    </>
  );
};

export default InsuranceDetails;
