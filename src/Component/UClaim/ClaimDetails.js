import React, { useEffect, useContext, useState, useRef } from "react";
// import Header from "../Header/Header";
import { useParams } from "react-router-dom";
// import Context from "./Context";
import { useHistory } from "react-router-dom";
import "./Claim.css";
// import CanvasDraw from "react-canvas-draw";
import SignatureCanvas from "react-signature-canvas";
// import download from "../Customer/download.png";
// import instance from "../../Instance";
import DashboardHeader from "../UDashboardHeader/DashboardHeader";
import instance from "../../Instance";

const ClaimDetails = () => {
  const sigRef1 = useRef();
  const sigRef2 = useRef();
  const sigRef3 = useRef();
  const sigRef4 = useRef();
  const [loader, setloader] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [allleaddetails, setAllLeadDetails] = useState(null);
  const [img, setImg] = useState(null);
  //   const { setCustomer } = useContext(Context);

  // const data2 = divRef1.current.toDataURL();
  // const data3 = divRef1.current.toDataURL();
  // const data4 = divRef1.current.toDataURL();
  // useEffect(() => {
  //   console.log("id", params.id);
  // }, []);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/customer/claim/view/${params.id}`)
      .then(({ data }) => {
        let climData = data?.claimDetails[0];
        console.log("customerdata", climData);
        setAllLeadDetails(climData);
        setloader(false);
        sigRef1.current.fromData(climData?.customerSign);
        sigRef1.current.off();
        sigRef2.current.fromData(climData?.authoritySign);
        sigRef2.current.off();
        sigRef3.current.fromData(climData?.damageCarPicture1);
        sigRef3.current.off();
        sigRef4.current.fromData(climData?.damageCarPicture2);
        sigRef4.current.off();

        // let dataUrl = sigRef1.current.toDataURL();
        // console.log("dddddddddddd", dataUrl);
        // setImg(dataUrl);
        // console.log("loveeee", climData?.damageCarPicture1[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [params.id]);
  // console.log("ndndnd", sigRef1.current.getData());
  // const img1 = sigRef2.current.toDataURL();
  // setImg(Can);
  // console.log("fffff", img);

  return (
    <>
      <DashboardHeader />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div className="row" style={{ padding: "10px", fontSize: "17px" }}>
            {/* <h3>Claim </h3> */}
            <div className="col-md-12 text-right">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.pdf}`)
                }
                style={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
                type="button"
                class="btn btn-primary button1"
              >
                Claim Certificate
              </button>
            </div>

            <div className="row container">
              <label>
                <b>Claim Details:</b>
              </label>
              <br />
            </div>
            <div className="row container" style={{ marginLeft: "50px" }}>
              <div className="col-md-4">
                <form className="demo">
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Date
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.date}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Fault
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.fault}
                  </label>
                  <br />
                  {/* <label
                  style={{ width: "300px" }}
                  htmlFor="email"
                  className="mr-sm-2"
                >
                  Insurance
                </label>
                <label
                  style={{ width: "300px" }}
                  htmlFor="email"
                  className="mr-sm-2"
                >
                  {allleaddetails?.insurance}
                </label> */}
                </form>
              </div>
              <div className="col-md-4">
                <form className="demo">
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Driver Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.driverName}
                  </label>
                  {/* <br /> */}
                  {/* <label
                  style={{ width: "300px" }}
                  htmlFor="pwd"
                  className="mr-sm-2"
                >
                  Hand Written Form
                </label>
                <label
                  style={{ width: "300px" }}
                  htmlFor="pwd"
                  className="mr-sm-2"
                >
                  <button
                    onClick={() =>
                      (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.handwrittenForm}`)
                    }
                    type="button"
                    class="btn btn-primary"
                    style={{
                      color: "white",
                      backgroundColor: "#DE0614",
                    }}
                  >
                    Claim Form
                  </button>
                </label> */}
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
                </form>
              </div>
              <div className="col-md-4">
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
                    {allleaddetails?.year}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Company
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.company}
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
                    Model
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.model}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Rego
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.rego}
                  </label>
                  <br />
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
                </form>
              </div>
              <div className="col-md-4">
                <form className="demo">
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Claim No
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.claimNo}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Insured
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.insured}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Owner Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oName}
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
                    Owner State
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oState}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Ower Suburb
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oSuburb}
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
                    Owner Address
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oAddress}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Owner Post
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oPost}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Owner Mobile
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.oMobile}
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
                    Driver Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dName}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Driver State
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dState}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Driver Suburb
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dSuburb}
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
                    Driver Post
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dPost}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Driver Address
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dAddress}
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
                    Driver Mobile
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dMobile}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Driver Birth
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dBirth}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Driver Licence No
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.dLicenceNo}
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
                    Place
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.place}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Location
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.location}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Street
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.street}
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
                    Date
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.aDate}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Damage Location
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.damageLocation}
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
                    PolicyNo
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.aPolicyNo}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Time
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.time}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Pre Vehicle Damage
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.preVehicleDamage}
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
                    Road Surface
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.roadSurface}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Cars Involved
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.carsInvolved}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Who Fault
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.whoFault}
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
                    Insured Vehicle Place
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.insuredVehiclePlace}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    What Happen
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.whatHappen}
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
                    Police Report
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.policeReport}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Police Last Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.policelName}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Police Station
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.ps}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Vehicle Towed
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.vehicleTowed}
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
                    Towed Place
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.towedPlace}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Towed By
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.towedBy}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Police FName
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.policefName}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Witness 1 No
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.witnessoNo}
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
                    Repairable
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.repairable}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Witness 1 Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.witnessoName}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Witness 2 Name
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.witnesstName}
                  </label>
                  <br />
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    Witness 2 No
                  </label>
                  <label
                    style={{ width: "300px" }}
                    htmlFor="pwd"
                    className="mr-sm-2"
                  >
                    {allleaddetails?.witnesstNo}
                  </label>
                </form>
              </div>
            </div>
            <div className="row container">
              <label>
                <b>My Car Image</b>
              </label>
              <br />
              <br />
            </div>

            {/* <div className="row" style={{ paddingLeft: "30px" }}> */}
            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img1}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 1
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img2}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 2
              </button>
            </div>
            <br />
            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img3}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 3
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img4}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 4
              </button>
            </div>
            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img5}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 5
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img6}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 6
              </button>
            </div>
            {/* </div> */}
            <br />
            <br />

            <div className="row container">
              <label>
                <b>Other Car Image</b>
              </label>
              <br />
              <br />
            </div>

            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img7}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 1
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img8}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 2
              </button>
            </div>
            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img9}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 3
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img10}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 4
              </button>
            </div>
            <div className="row">
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img11}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 5
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/claim/${allleaddetails?.img12}`)
                }
                type="button"
                class="btn btn-primary button1"
                style={{
                  color: "white",
                  backgroundColor: "#DE0614",
                }}
              >
                Image 6
              </button>
            </div>

            <div className="row"></div>

            <div
              className="row justify-content-center"
              style={{ width: "100%" }}
            >
              {/* <form className="demo"> */}
              {/* <div className="row"> */}
              {/* <div className="col-md-6 canvasImageSet"></div>
            <div className="col-md-6 canvasImageSet"></div> */}
              {/* </div> */}
              <div className="col-md-6 ">
                <div className="text-center">
                  <label
                    style={{ width: "100px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Damage Car Picture 1
                  </label>
                </div>

                <div class="card" style={{ width: "25rem", margin: "auto" }}>
                  <div class="card-body">
                    {allleaddetails != null && (
                      <SignatureCanvas
                        penColor="black"
                        disabled
                        ref={sigRef3}
                        style={{ boxShadow: "2px 4px 10px black" }}
                        canvasProps={{
                          width: 300,
                          height: 200,
                          className: "sigCanvas12",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* 


              {allleaddetails != null && (
                <CanvasDraw
                  disabled
                  style={{
                    boxShadow: "2px 4px 10px black",
                    backgroundImage: `url(${download})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: " center",
                  }}
                  brushRadius={3}
                  canvasWidth={400}
                  canvasHeight={300}
                  saveData={allleaddetails?.damageCarPicture1}
                />
              )} */}
              </div>
              <div className="col-md-6">
                <div className="text-center">
                  <label
                    style={{ width: "100px" }}
                    htmlFor="email"
                    className="mr-sm-2"
                  >
                    Damage Car Picture 2
                  </label>
                </div>

                <div class="card" style={{ width: "25rem", margin: "auto" }}>
                  <div class="card-body">
                    {allleaddetails != null && (
                      <SignatureCanvas
                        penColor="black"
                        disabled
                        ref={sigRef4}
                        style={{ boxShadow: "2px 4px 10px black" }}
                        canvasProps={{
                          width: 300,
                          height: 200,
                          className: "sigCanvas12",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* {allleaddetails != null && (
                <CanvasDraw
                  disabled
                  style={{
                    boxShadow: "2px 4px 10px black",
                    backgroundImage: `url(${download})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: " center",
                  }}
                  brushRadius={3}
                  canvasWidth={400}
                  canvasHeight={300}
                  saveData={allleaddetails?.damageCarPicture2}
                />
              )} */}
              </div>
              <br />
              <br />
              {/* </form> */}
            </div>
            <br />
            <br />
            {/* <div className="row container">
            <div className="col-md-6 canvasImageSet">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sigRef3.current.fromData(allleaddetails?.damageCarPicture1);
                }}
              >
                Get{" "}
              </button>
            </div>
            <div className="col-md-6 canvasImageSet">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sigRef4.current.fromData(allleaddetails?.damageCarPicture2);
                }}
              >
                Get{" "}
              </button>
            </div>
          </div> */}
            <div
              className="row justify-content-center"
              style={{ width: "100%" }}
            >
              <div className="col-md-6 mt-4 canvasImageSet">
                <div class="card" style={{ width: "25rem", margin: "auto" }}>
                  <div class="card-body">
                    <label
                      style={{ width: "200px" }}
                      htmlFor="pwd"
                      className="mr-sm-2"
                    >
                      Customer Sign
                    </label>
                    {allleaddetails != null && (
                      <SignatureCanvas
                        penColor="black"
                        disabled
                        ref={sigRef1}
                        style={{ boxShadow: "2px 4px 10px black" }}
                        canvasProps={{
                          width: 300,
                          height: 200,
                          className: "sigCanvas",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="col-md-6 mt-4 canvasImageSet">
                <div class="card" style={{ width: "25rem", margin: "auto" }}>
                  <div class="card-body">
                    <label
                      style={{ width: "200px" }}
                      htmlFor="email"
                      className="mr-sm-2"
                    >
                      Authority Sign
                    </label>
                    {allleaddetails != null && (
                      <SignatureCanvas
                        penColor="black"
                        disabled
                        ref={sigRef2}
                        style={{ boxShadow: "2px 4px 10px black" }}
                        canvasProps={{
                          width: 300,
                          height: 200,
                          className: "sigCanvas",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="row container">
              <div className="col-md-6 canvasImageSet">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sigRef1.current.fromData(allleaddetails?.customerSign);
                  }}
                >
                  Get{" "}
                </button>
              </div>
              <div className="col-md-6 canvasImageSet">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sigRef2.current.fromData(allleaddetails?.authoritySign);
                  }}
                >
                  Get{" "}
                </button>
              </div>
            </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimDetails;
