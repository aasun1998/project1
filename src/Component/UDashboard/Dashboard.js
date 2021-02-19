import React, { useEffect, useState } from "react";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";
import ReactCardFlip from "react-card-flip";
const QRCode = require("qrcode.react");

const Dashboard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loader, setloader] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const [oneview, setOneView] = useState([]);
  const [card, setCard] = useState([]);
  const [name, setName] = useState([]);
  const [customer, setCustomer] = useState("");
  const [insurance, setInsurance] = useState(null);
  const [claim, setClaim] = useState(null);
  const [driver, setDriver] = useState(null);
  const [vehicle, setVehicle] = useState(null);

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
            setName(data?.data[0]?.name);
            setCustomer(data?.data[0]?._id);
            console.log("loveu", data?.data[0]._id);
            instance
              .get(
                `/customer/vd/view/${data?.data[0]?.insuranceDetails[0]?._id}`
              )
              .then(({ data }) => {
                console.log("data", data);
                setOneView(data?.data[0]._id);
                setCard(data?.data[0]);
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
  console.log("hateu", customer);
  useEffect(() => {
    if (customer != "")
      instance
        .get(`/count/user/insurance/${customer}`)
        .then(({ data }) => {
          console.log("icount", data);
          setInsurance(data?.onfaultData);
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [customer]);

  useEffect(() => {
    if (customer != "")
      instance
        .get(`/count/user/claim/${customer}`)
        .then(({ data }) => {
          console.log("ccount", data);
          setClaim(data?.onfaultData);
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [customer]);

  useEffect(() => {
    if (oneview != "")
      instance
        .get(`/count/user/vehicle/${oneview}`)
        .then(({ data }) => {
          console.log("vcount", data);
          setVehicle(data?.onfaultData);
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [oneview]);

  useEffect(() => {
    if (oneview != "");
    instance
      .get(`/count/user/driver/${oneview}`)
      .then(({ data }) => {
        console.log("dcount", data);

        setDriver(data?.onfaultData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [oneview]);

  return (
    <>
      <DashboardHeader />
      <div className="app-admin-wrap layout-sidebar-large">
        {/* <div className="main-header">
          <div className="sidebar-overlay" />
        </div> */}
        {/* =============== Left side End ================*/}
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          {/* ============ Body content start ============= */}
          {loader ? (
            <div class="d-flex justify-content-center">
              <div class="spinner-border"></div>
            </div>
          ) : (
            <div className="main-content">
              <div
                className="breadcrumb"
                style={{ backgroundColor: "#7FCDAD", height: "50px" }}
              >
                <h1 className="ml-2">Dashboard</h1>
                {/* <ul>
                <li>
                  <h1>Dashboard</h1>
                </li>
                <li>Version 1</li>
              </ul> */}
              </div>

              <div className="separator-breadcrumb border-top" />
              <div className="row">
                {/* ICON BG*/}
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <div className="card-body text-center">
                      <img
                        style={{ width: "50px" }}
                        src="https://img.pngio.com/assessment-document-insurance-letter-official-protection-letter-review-png-512_512.png"
                        alt="lead"
                      />
                      {/* <i className="i-Add-User" /> */}
                      <div className="col-md-12">
                        <p className="text-muted mt-2 mb-0">
                          <b>Insurance</b>
                        </p>
                        <p className="text-24 line-height-1">
                          <b>{insurance}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <div className="card-body text-center">
                      <img
                        style={{ width: "50px" }}
                        src="https://www.nicepng.com/png/full/262-2621709_emergency-roadside-assistance-icon-car-crash-icon-png.png"
                        alt="lead"
                      />
                      {/* <i className="i-Financial" /> */}
                      <div className="col-md-12">
                        <p className="text-muted mt-2 mb-0">
                          <b>Claim</b>
                        </p>
                        <p className="text-24 line-height-1">
                          <b>{claim}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <div className="card-body text-center">
                      <img
                        style={{ width: "50px" }}
                        src="https://image.flaticon.com/icons/png/512/1535/1535791.png"
                        alt="lead"
                      />
                      {/* <i className="i-Checkout-Basket" /> */}
                      <div className="col-md-12">
                        <p className="text-muted mt-2 mb-0">
                          <b>Driver</b>
                        </p>
                        <p className="text-24 line-height-1">
                          <b>{driver}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                    <div className="card-body text-center">
                      <img
                        style={{ width: "50px" }}
                        src="https://img.icons8.com/plasticine/2x/car.png"
                        alt="lead"
                      />
                      {/* <i className="i-Money-2" /> */}
                      <div className="col-md-12">
                        <p className="text-muted mt-2 mb-0">
                          <b>Vehicle</b>
                        </p>
                        <p className="text-24 line-height-1">
                          <b>{vehicle}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="card"
                    style={{
                      margin: "0 auto" /* Added */,
                      float: "none" /* Added */,
                      marginBottom: "10px",
                    }}
                    // style={{ width: "30rem" }}
                  >
                    <div class="card-body">
                      <div className="center">
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
                                    card.package === "GOLD" ||
                                    card.package === "Gold" ||
                                    card.package === "gold"
                                      ? "linear-gradient(180deg, rgba(245,197,107,1) 0%, rgba(240,214,10,1) 100%)"
                                      : card.package === "SILVER" ||
                                        card.package === "Silver" ||
                                        card.package === "silver"
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
                                    }}
                                    src={cams}
                                  />
                                  <h5
                                    class="card-title"
                                    style={{
                                      position: "absolute",
                                      top: "8px",
                                      right: "16px",
                                    }}
                                  >
                                    {card?.package}
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
                                    {card?.cardNo}
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
                                    {name}
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
                                    Valid UpTo: {card.validity}
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
                                    card.package === "GOLD" ||
                                    card.package === "Gold" ||
                                    card.package === "gold"
                                      ? "linear-gradient(180deg, rgba(245,197,107,1) 0%, rgba(240,214,10,1) 100%)"
                                      : card.package === "SILVER" ||
                                        card.package === "Silver" ||
                                        card.package === "silver"
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
                                    {card?.package}
                                  </h5>

                                  <QRCode
                                    value={`Cams Club\n${card.cardNo}\n${card.package}\n${card.validity}`}
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
                <div
                  className="col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    class="card"
                    style={{
                      margin: "0 auto" /* Added */,
                      float: "none" /* Added */,
                      marginBottom: "10px",
                    }}
                  >
                    <div class="card-body">
                      <h5 class="card-title">Chanel Partners</h5>

                      <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img
                              src="https://image.shutterstock.com/image-photo/business-team-members-standing-over-260nw-1397307989.jpg"
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://images.moneycontrol.com/static-mcnews/2018/03/car-insurance-770x433.jpg"
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://www.thestreet.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTY3NTM5MzU5MDg3MjczODcw/business-structure-which-type-is-best-for-your-business.png"
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        </div>
                        <a
                          className="carousel-control-prev"
                          href="#carouselExampleControls"
                          role="button"
                          data-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Previous</span>
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#carouselExampleControls"
                          role="button"
                          data-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card-title">This Year Sales</div>
                    <div id="echartBar" style={{ height: 300 }} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card-title">Sales by Countries</div>
                    <div id="echartPie" style={{ height: 300 }} />
                  </div>
                </div>
              </div>
            </div> */}
              {/* <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="card card-chart-bottom o-hidden mb-4">
                      <div className="card-body">
                        <div className="text-muted">Last Month Sales</div>
                        <p className="mb-4 text-primary text-24">$40250</p>
                      </div>
                      <div id="echart1" style={{ height: 260 }} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="card card-chart-bottom o-hidden mb-4">
                      <div className="card-body">
                        <div className="text-muted">Last Week Sales</div>
                        <p className="mb-4 text-warning text-24">$10250</p>
                      </div>
                      <div id="echart2" style={{ height: 260 }} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card o-hidden mb-4">
                      <div className="card-header d-flex align-items-center border-0">
                        <h3 className="w-50 float-left card-title m-0">
                          New Users
                        </h3>
                        <div className="dropdown dropleft text-right w-50 float-right">
                          <button
                            className="btn bg-gray-100"
                            id="dropdownMenuButton1"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="nav-icon i-Gear-2" />
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <a className="dropdown-item" href="#">
                              Add new user
                            </a>
                            <a className="dropdown-item" href="#">
                              View All users
                            </a>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="table-responsive">
                          <table className="table text-center" id="user_table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Smith Doe</td>
                                <td>
                                  <img
                                    className="rounded-circle m-0 avatar-sm-table"
                                    src="../../dist-assets/images/faces/1.jpg"
                                    alt
                                  />
                                </td>
                                <td>Smith@gmail.com</td>
                                <td>
                                  <span className="badge badge-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <a className="text-success mr-2" href="#">
                                    <i className="nav-icon i-Pen-2 font-weight-bold" />
                                  </a>
                                  <a className="text-danger mr-2" href="#">
                                    <i className="nav-icon i-Close-Window font-weight-bold" />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>Jhon Doe</td>
                                <td>
                                  <img
                                    className="rounded-circle m-0 avatar-sm-table"
                                    src="../../dist-assets/images/faces/1.jpg"
                                    alt
                                  />
                                </td>
                                <td>Jhon@gmail.com</td>
                                <td>
                                  <span className="badge badge-info">
                                    Pending
                                  </span>
                                </td>
                                <td>
                                  <a className="text-success mr-2" href="#">
                                    <i className="nav-icon i-Pen-2 font-weight-bold" />
                                  </a>
                                  <a className="text-danger mr-2" href="#">
                                    <i className="nav-icon i-Close-Window font-weight-bold" />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>Alex</td>
                                <td>
                                  <img
                                    className="rounded-circle m-0 avatar-sm-table"
                                    src="../../dist-assets/images/faces/1.jpg"
                                    alt
                                  />
                                </td>
                                <td>Otto@gmail.com</td>
                                <td>
                                  <span className="badge badge-warning">
                                    Not Active
                                  </span>
                                </td>
                                <td>
                                  <a className="text-success mr-2" href="#">
                                    <i className="nav-icon i-Pen-2 font-weight-bold" />
                                  </a>
                                  <a className="text-danger mr-2" href="#">
                                    <i className="nav-icon i-Close-Window font-weight-bold" />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">4</th>
                                <td>Mathew Doe</td>
                                <td>
                                  <img
                                    className="rounded-circle m-0 avatar-sm-table"
                                    src="../../dist-assets/images/faces/1.jpg"
                                    alt
                                  />
                                </td>
                                <td>Mathew@gmail.com</td>
                                <td>
                                  <span className="badge badge-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <a className="text-success mr-2" href="#">
                                    <i className="nav-icon i-Pen-2 font-weight-bold" />
                                  </a>
                                  <a className="text-danger mr-2" href="#">
                                    <i className="nav-icon i-Close-Window font-weight-bold" />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card-title">Top Selling Products</div>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3">
                      <img
                        className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                        src="../../dist-assets/images/products/headphone-4.jpg"
                        alt
                      />
                      <div className="flex-grow-1">
                        <h5>
                          <a href="#">Wireless Headphone E23</a>
                        </h5>
                        <p className="m-0 text-small text-muted">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <p className="text-small text-danger m-0">
                          $450
                          <del className="text-muted">$500</del>
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                          View details
                        </button>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3">
                      <img
                        className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                        src="../../dist-assets/images/products/headphone-2.jpg"
                        alt
                      />
                      <div className="flex-grow-1">
                        <h5>
                          <a href="#">Wireless Headphone Y902</a>
                        </h5>
                        <p className="m-0 text-small text-muted">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <p className="text-small text-danger m-0">
                          $550
                          <del className="text-muted">$600</del>
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View details
                        </button>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3">
                      <img
                        className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                        src="../../dist-assets/images/products/headphone-3.jpg"
                        alt
                      />
                      <div className="flex-grow-1">
                        <h5>
                          <a href="#">Wireless Headphone E09</a>
                        </h5>
                        <p className="m-0 text-small text-muted">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <p className="text-small text-danger m-0">
                          $250
                          <del className="text-muted">$300</del>
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View details
                        </button>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3">
                      <img
                        className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                        src="../../dist-assets/images/products/headphone-4.jpg"
                        alt
                      />
                      <div className="flex-grow-1">
                        <h5>
                          <a href="#">Wireless Headphone X89</a>
                        </h5>
                        <p className="m-0 text-small text-muted">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <p className="text-small text-danger m-0">
                          $450
                          <del className="text-muted">$500</del>
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body p-0">
                    <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                      <span>User activity</span>
                      <span className="flex-grow-1" />
                      <span className="badge badge-pill badge-warning">
                        Updated daily
                      </span>
                    </div>
                    <div className="d-flex border-bottom justify-content-between p-3">
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">
                          Pages / Visit
                        </span>
                        <h5 className="m-0">2065</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">New user</span>
                        <h5 className="m-0">465</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">Last week</span>
                        <h5 className="m-0">23456</h5>
                      </div>
                    </div>
                    <div className="d-flex border-bottom justify-content-between p-3">
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">
                          Pages / Visit
                        </span>
                        <h5 className="m-0">1829</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">New user</span>
                        <h5 className="m-0">735</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">Last week</span>
                        <h5 className="m-0">92565</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">
                          Pages / Visit
                        </span>
                        <h5 className="m-0">3165</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">New user</span>
                        <h5 className="m-0">165</h5>
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-small text-muted">Last week</span>
                        <h5 className="m-0">32165</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card mb-4">
                  <div className="card-body p-0">
                    <h5 className="card-title m-0 p-3">Last 20 Day Leads</h5>
                    <div id="echart3" style={{ height: 360 }} />
                  </div>
                </div>
              </div>
            </div> */}
              {/* end of main-content */}
            </div>
          )}
          {/* Footer Start */}
          <div className="flex-grow-1" />
          <div className="app-footer">
            <div className="row">
              <div className="col-md-9">
                {/* <p>
                  <strong>Gull - Laravel + Bootstrap 4 admin template</strong>
                </p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Libero quis beatae officia saepe perferendis voluptatum minima
                  eveniet voluptates dolorum, temporibus nisi maxime nesciunt
                  totam repudiandae commodi sequi dolor quibusdam
                  <sunt />
                </p> */}
              </div>
            </div>
            <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
              {/* <a
                className="btn btn-primary text-white btn-rounded"
                href="https://themeforest.net/item/gull-bootstrap-laravel-admin-dashboard-template/23101970"
                target="_blank"
              >
                Buy Gull HTML
              </a> */}
              <span className="flex-grow-1" />
              <div className="d-flex align-items-center">
                {/* <img
                  className="logo"
                  src="../../dist-assets/images/logo.png"
                  alt
                /> */}
                <div>
                  <p className="m-0">Copyright © 2020</p>
                  <p className="m-0">
                    Designed by <b style={{ color: "blue" }}>❤ Techbae Team</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* fotter end */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
