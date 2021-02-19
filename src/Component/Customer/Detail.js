import React, { useEffect, useContext, useState } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";
import { useParams } from "react-router-dom";
import Context from "./Context";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Details.css";
import { useAlert } from "react-alert";
import moment from "moment";
import cams from "./cams.png";
import ReactCardFlip from "react-card-flip";
const QRCode = require("qrcode.react");

export default function Detail() {
  const [isFlipped, setIsFlipped] = useState(false);
  const alert = useAlert();
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const params = useParams();
  const [allleaddetails, setAllLeadDetails] = useState(null);
  const [insurance, setInsurance] = useState([]);
  const [card, setCard] = useState([]);
  // const[insurancefilter, setInsuranceFilter]=useState([])
  const [claim, setClaim] = useState([]);
  // const[claimfilter, setClaimFilter]=useState([])
  const [reload, setReload] = useState(false);
  const [clickButtonId, setClickButtonId] = useState(-1);
  // const [mailvehicle, setMailVehicle] = useState(null);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
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

  const { setCustomer } = useContext(Context);

  const [userDetails, setUserDetails] = useState({
    car: "",
    reason: "",
    discount: "",
  });

  useEffect(() => {
    console.log("id", params.id);
  }, []);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/customer/details/view/${params.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("customerdata", data);
        setAllLeadDetails(data?.data[0]);
        setInsurance(data?.data[0].insuranceDetails);
        setCard(data?.data[0].insuranceDetails[0]);
        setClaim(data?.data[0].claimDetails);
        setloader(false);
        // setInsuranceFilter(data?.data[0].insuranceDetails)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [reload]);

  const ClaimDetails = (id) => {
    history.push(`/claimdetails/${id}`);
  };

  const DriverDetails = (id) => {
    history.push(`/driverdetails/${id}`);
  };

  const PermanentInsuranceHistory = () => {
    history.push(`/pihistory`);
  };

  const VehicleDetails = (id) => {
    history.push(`/vehicledetails/${id}`);
  };

  const InsuranceDetails = (id) => {
    history.push(`/insurancedetails/${id}`);
  };

  const notes = (id) => {
    history.push(`/customernote/${id}`);
  };

  const Edit = (allleaddetails) => {
    setCustomer(allleaddetails);
    history.push(`/customeredit/${allleaddetails._id}`);
  };

  const cEdit = (value) => {
    setCustomer(value);
    console.log(setCustomer);
    history.push(`/claimedit/${value._id}`);
  };

  const addInsurance = (allleaddetails) => {
    history.push(`/addinsurance/${allleaddetails._id}`);
  };

  const addClaim = (allleaddetails) => {
    history.push(`/addclaim/${allleaddetails._id}`);
  };

  const Apply = () => {
    instance
      .put(
        "/customer/discount/update",
        {
          _id: params.id,
          car: userDetails.car,
          discount: userDetails.discount,
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
        alert.success("Customer Deleted");
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const handelDelite = (value, e) => {
    e.preventDefault();
    // setAllLeadDetails(allleaddetails?.insuranceDetails?.filter(temp=> temp._id!=value._id))
    setInsurance(insurance.filter((temp) => temp._id != value._id));
    alert.success("Customer Deleted");
    instance
      .post(
        `/insurance/history/${value._id}`,
        {
          policyNo: value.policyNo,
          policyType: value.policyType,
          overdue: value.overdue,
          pdf: value.pdf,
          valueInsured: value.valueInsured,
          valuationType: value.valuationType,
          discount: value.discount,
          status: value.status,
          reason: value.reason,
          package: value.package,
          cardNo: value.cardNo,
          validity: value.validity,
          insuranceType: value.insuranceType,
          premium: value.premium,
          excess: value.excess,
          period: value.period,
          startDate: value.startDate,
          endDate: value.endDate,
          nextPaymentDue: value.nextPaymentDue,
          customerId: value.customerId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            userId: allleaddetails.name,
            policyNo: value.policyNo,
            category: "Deleted Insurance",
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
        console.log("Error in delete", err);
      });
  };

  const claimDelite = (value, e) => {
    e.preventDefault();
    // setAllLeadDetails(allleaddetails?.insuranceDetails?.filter(temp=> temp._id!=value._id))
    setClaim(claim.filter((temp) => temp._id != value._id));
    alert.success("Claim Deleted");
    instance
      .post(
        `/claim/history/${value._id}`,
        {
          pdf: value.pdf,
          date: value.date,
          fault: value.fault,
          insurance: value.insurance,
          driverName: value.driverName,
          handwrittenForm: value.handwrittenForm,
          make: value.make,
          year: value.year,
          company: value.company,
          model: value.model,
          rego: value.rego,
          policyNo: value.policyNo,
          claimNo: value.claimNo,
          insured: value.insured,
          oName: value.oName,
          oState: value.oState,
          oSuburb: value.oSuburb,
          oAddress: value.oAddress,
          oPost: value.oPost,
          oMobile: value.oMobile,
          dName: value.dName,
          dState: value.dState,
          dSuburb: value.dSuburb,
          dPost: value.dPost,
          dAddress: value.dAddress,
          dMobile: value.dMobile,
          dBirth: value.dBirth,
          dLicenceNo: value.dLicenceNo,
          place: value.place,
          location: value.location,
          street: value.street,
          aDate: value.aDate,
          damageLocation: value.damageLocation,
          aPolicyNo: value.aPolicyNo,
          time: value.time,
          preVehicleDamage: value.preVehicleDamage,
          roadSurface: value.roadSurface,
          carsInvolved: value.carsInvolved,
          whoFault: value.whoFault,
          insuredVehiclePlace: value.insuredVehiclePlace,
          img1: value.img1,
          img2: value.img2,
          img3: value.img3,
          img4: value.img4,
          img5: value.img5,
          img6: value.img6,
          img7: value.img7,
          img8: value.img8,
          img9: value.img9,
          img10: value.img10,
          img11: value.img11,
          img12: value.img12,
          whatHappen: value.whatHappen,
          damageCarPicture1: value.damageCarPicture1,
          damageCarPicture2: value.damageCarPicture2,
          policeReport: value.policeReport,
          policefName: value.policefName,
          policelName: value.policelName,
          ps: value.ps,
          vehicleTowed: value.vehicleTowed,
          towedPlace: value.towedPlace,
          towedBy: value.towedBy,
          repairable: value.repairable,
          witnessoName: value.witnessoName,
          witnesstName: value.witnesstName,
          witnessoNo: value.witnessoNo,
          witnesstNo: value.witnesstNo,
          customerSign: value.customerSign,
          authoritySign: value.authoritySign,
          customerId: value.customerId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            userId: allleaddetails.name,
            policyNo: value.claimNo,
            category: "Deleted Claim",
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
        console.log("Error in delete", err);
      });
  };

  const Active = (value, i) => {
    setClickButtonId(i);

    instance
      .get(`/customer/vd/view/${value._id}`)
      .then(({ data }) => {
        console.log("alldataaaa", data?.data[0]?.vehicleDetails[0]);
        let mailvehicle = data?.data[0]?.vehicleDetails[0];
        instance
          .put(`/insurance/status/view/${value._id}`)
          .then(() => {
            console.log("Update Transfer");
            if (value.status == true) {
              instance
                .post(`/send/mail/cancell`, {
                  email: allleaddetails.email,
                  name: allleaddetails?.name,
                  address:
                    allleaddetails?.address +
                    "," +
                    allleaddetails?.suburb +
                    "," +
                    allleaddetails?.date +
                    "," +
                    allleaddetails?.post,
                  vehicle:
                    mailvehicle?.year +
                    "," +
                    mailvehicle?.make +
                    "," +
                    mailvehicle?.model +
                    "," +
                    mailvehicle?.color +
                    "," +
                    mailvehicle?.regoNo,
                  date: moment().format("LLL"),
                })
                .then(() => {
                  console.log("Cancel");
                })
                .catch((err) => {
                  console.log("Error in Cancel", err);
                });
            } else {
              instance
                .post(`/send/mail/reinstated`, {
                  email: allleaddetails?.email,
                  name: allleaddetails?.name,
                  address:
                    allleaddetails?.address +
                    "," +
                    allleaddetails?.suburb +
                    "," +
                    allleaddetails?.date +
                    "," +
                    allleaddetails?.post,
                  vehicle:
                    mailvehicle?.year +
                    "," +
                    mailvehicle.make +
                    "," +
                    mailvehicle.model +
                    "," +
                    mailvehicle.color +
                    "," +
                    mailvehicle.regoNo,
                  date: moment().format("LLL"),
                })
                .then(() => {
                  console.log("Reinstated");
                })
                .catch((err) => {
                  console.log("Error in Reinstated", err);
                });
            }
            setReload(!reload);
            alert.success(
              value.status == true
                ? "Insurance Cancelled"
                : "Insurance Reinstated"
            );
          })
          .catch((err) => {
            console.log("Error in delete", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <div className="row">
          {/* <button
            onClick={PermanentInsuranceHistory}
            style={{ width: "200px" }}
            type="button"
            class="btn btn-danger"
          >
            Old Insurance History
          </button> */}
        </div>
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div class="card">
                <div class="card-body" style={{ fontSize: "17px" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="text-left">
                        <b>Personal Details:</b>
                      </label>
                    </div>
                    <div className="col-md-6 text-right">
                      <svg
                        onClick={() => Edit(allleaddetails)}
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
                    <br />
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
                          Full Name
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.name}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          State
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.date}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          Email
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.email}
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
                          Company
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.type}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Address
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.address}
                        </label>
                        <br />
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          Phone
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.phone}
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
                          Suburb
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="email"
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
                          Post
                        </label>
                        <label
                          style={{ width: "300px" }}
                          htmlFor="pwd"
                          className="mr-sm-2"
                        >
                          {allleaddetails?.post}
                        </label>
                      </form>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <label className="text-left">
                        <b>Insurance Details:</b>
                      </label>
                    </div>
                    <div className="col-md-6 text-right">
                      <svg
                        onClick={() => addInsurance(allleaddetails)}
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
                    <br />
                  </div>

                  <div style={{ overflowX: "scroll" }}>
                    <table class="table">
                      <thead style={{ backgroundColor: "#00a65a73" }}>
                        <tr>
                          <th>Id</th>
                          <th scope="col">Policy No</th>
                          <th scope="col">Policy Type</th>
                          {/* <th scope="col">Insurance Type</th>
      <th scope="col">Overdue</th>
      <th scope="col">Premium</th>
      <th scope="col">Excess</th>
      <th scope="col">Period</th> */}
                          <th scope="col">StartDate</th>
                          <th scope="col">EndDate</th>
                          <th scope="col">A/D</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {insurance &&
                          insurance.map((value, i) => (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>
                                <b>
                                  <a
                                    onClick={() => InsuranceDetails(value._id)}
                                  >
                                    {value?.policyNo}
                                  </a>
                                </b>
                              </td>
                              <td>
                                {" "}
                                <a onClick={() => InsuranceDetails(value._id)}>
                                  {value?.policyType}
                                </a>
                              </td>
                              {/* <td>{value?.insuranceType}</td>
      <td>{value?.overdue}</td>
      <td>{value?.premium}</td>
      <td>{value?.excess}</td>
      <td>{value?.period}</td> */}
                              <td>
                                {" "}
                                <a onClick={() => InsuranceDetails(value._id)}>
                                  {value?.startDate}
                                </a>
                              </td>
                              <td>
                                {" "}
                                <a onClick={() => InsuranceDetails(value._id)}>
                                  {value?.endDate}
                                </a>
                              </td>
                              <td>
                                {value.status == true ? (
                                  <button
                                    onClick={() => Active(value, i)}
                                    type="button"
                                    style={{ width: "90px" }}
                                    class="btn btn-success"
                                  >
                                    Active
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => Active(value, i)}
                                    type="button"
                                    style={{ width: "90px" }}
                                    class="btn btn-danger"
                                  >
                                    Cancelled
                                  </button>
                                )}
                              </td>
                              <td>
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
                  <br />
                  {/* <div className='row'>
      <label><b>Vehicle Details:</b></label>
     
    <br/>
    <br/>
    </div> */}

                  {/* <div style={{overflowX: "scroll"}}>
    <table class="table">
  <thead>
    <tr>
      <th>Id</th>
      <th scope="col">Rego No</th>
      <th scope="col">Vehicle Type</th>
      {/* <th scope="col">Color</th>
      <th scope="col">Year</th>
      <th scope="col">Make</th>
      <th scope="col">Model</th>
      <th scope="col">Vin</th> */}
                  {/* <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    {allleaddetails !== null && allleaddetails.vehicleDetails.map((value,i)=>(
    <tr key={i}>
      <th>{i+1}</th>
    <td><a onClick={()=> VehicleDetails(value._id)}>{value?.regoNo}</a></td>
      <td>{value?.vehicleType}</td> */}
                  {/* <td>{value?.color}</td>
      <td>{value?.year}</td>
      <td>{value?.make}</td>
      <td>{value?.model}</td>
      <td>{value?.vin}</td> */}
                  {/* <td>  <svg onClick={()=> vEdit(value)} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg></td>
    </tr>
      ) )}
  </tbody>
</table>
      </div>  */}

                  <div className="row">
                    <div className="col-md-6">
                      <label className="text-left">
                        <b>Claim Details:</b>
                      </label>
                    </div>
                    <div className="col-md-6 text-right">
                      <svg
                        onClick={() => addClaim(allleaddetails)}
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
                    <br />
                  </div>

                  <div style={{ overflowX: "scroll" }}>
                    <table class="table">
                      <thead style={{ backgroundColor: "#00a65a73" }}>
                        <tr>
                          <th>Id</th>
                          <th scope="col">Claim No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Fault</th>
                          <th scope="col">Insurance</th>
                          <th scope="col">Driver Name</th>
                          {/* <th scope="col">Hand Written Form</th> */}
                          <th scope="col">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {claim &&
                          claim.map((value, i) => (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <th>
                                {" "}
                                <a onClick={() => ClaimDetails(value._id)}>
                                  {value.claimNo}
                                </a>
                              </th>
                              <td>
                                <a onClick={() => ClaimDetails(value._id)}>
                                  {moment(new Date(value?.createdAt)).format(
                                    "DD/MM/YYYY"
                                  )}
                                  <br />
                                  {new Date(
                                    value?.createdAt
                                  ).toLocaleTimeString()}
                                </a>
                              </td>
                              <td>
                                {" "}
                                <a onClick={() => ClaimDetails(value._id)}>
                                  {value?.fault}
                                </a>
                              </td>
                              <td>
                                {" "}
                                <a onClick={() => ClaimDetails(value._id)}>
                                  {value?.insurance}
                                </a>
                              </td>
                              <td>
                                {" "}
                                <a onClick={() => ClaimDetails(value._id)}>
                                  {value?.driverName}
                                </a>
                              </td>
                              {/* <td>{value?.handwrittenForm}</td> */}
                              <td>
                                {" "}
                                <svg
                                  onClick={() => cEdit(value)}
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
                                  onClick={(e) => claimDelite(value, e)}
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

                  {/* <div className='row'>
      <label><b>Driver Details:</b></label>
    
    <br/>
    </div> */}

                  {/* <div style={{overflowX: "scroll"}}>
    <table class="table">
  <thead>
    <tr>
      <th>Id</th>
      <th scope="col">Name</th>
      <th scope="col">Vehicle Type</th>
      <th scope="col">Mobile</th> */}
                  {/* <th scope="col">Address</th>
      <th scope="col">Post</th>
      <th scope="col">Suburb</th>
      <th scope="col">Date of Birth</th> */}
                  {/* <th scope="col">Lience No</th> */}
                  {/* <th scope="col">Lience Expiery</th> */}
                  {/* <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    {allleaddetails !== null && allleaddetails.driversDetails.map((value,i)=>(
    <tr key={i}>
      <th>{i+1}</th>
    <td><a onClick={()=> DriverDetails(value._id)}>{value?.name}</a></td>
      <td>{value?.vehicle}</td>
      <td>{value?.mobile}</td> */}
                  {/* <td>{value?.address}</td>
      <td>{value?.post}</td>
      <td>{value?.suburb}</td>
      <td>{value?.birthdate}</td> */}
                  {/* <td>{value?.licenceno}</td> */}
                  {/* <td>{value?.licenceexpiry}</td> */}
                  {/* <td>  <svg onClick={()=> dEdit(value)} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg></td>
    </tr>
      ) )}
  </tbody>
</table>
      </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div className="center" style={{ marginLeft: "30px" }}>
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
                              margin: "0 auto" /* Added */,
                              float: "none" /* Added */,
                              marginBottom: "10px" /* Added */,
                              background:
                                card.package === "GOLD" ||
                                card.package === "Gold" ||
                                card.package === "gold"
                                  ? "linear-gradient(180deg, rgba(245,197,107,1) 0%, rgba(240,214,10,1) 100%)"
                                  : card.package === "SILVER" ||
                                    (card.package === "Silver") |
                                      (card.package === "silver")
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
                                  width: "120px",
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
                                {card.package}
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
                                {card.cardNo}
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
                                {allleaddetails?.name}
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
                              margin: "0 auto" /* Added */,
                              float: "none" /* Added */,
                              marginBottom: "10px" /* Added */,
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
                                {card.package}
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
                  <div className="row">
                    <div className="col-md-6">
                      <h5 class="card-title text-left">Notes</h5>
                    </div>
                    <div className="col-md-6 text-right">
                      <svg
                        onClick={() => notes(allleaddetails._id)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-card-list"
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
                    <br />
                  </div>
                  <div style={{ overflow: "scroll" }}>
                    <table class="table">
                      <thead style={{ backgroundColor: "#00a65a73" }}>
                        <tr>
                          <th scope="col">Note</th>
                          <th>Created Date and Time</th>
                          <th scope="col">Date</th>
                          <th scope="col">Created By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allleaddetails !== null &&
                          allleaddetails.customerNotes.map((value, i) => (
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
                            Discount
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
                            type="text"
                            class="form-control"
                            placeholder="Reason"
                            id="reason"
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
                            onClick={Apply}
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
              </div>
            </div>
            {/* <button style={{width: '200px'}} type="button" class="btn btn-outline-primary">Add Insurance Claim</button>
    <label>Insurance Claim Details</label>
    <button style={{width: '200px'}} type="button" class="btn btn-outline-secondary">Add Insurance Billing</button>
    <label>Billing Details</label> */}
          </div>
        )}
      </div>
    </div>
  );
}
