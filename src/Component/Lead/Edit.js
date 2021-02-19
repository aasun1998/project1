import React, { useContext, useState, useEffect } from "react";
import Header from "../Header/Header";
import Context from "./Context";
import { Redirect, useParams } from "react-router-dom";
import instance from "../../Instance";
import "./Lead.css";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

export default function Edit() {
  const alert = useAlert();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [price, setPrice] = useState(null);

  useEffect(() => {
    instance
      .get(`/api/allpolicy/view`)
      .then(({ data }) => {
        console.log("policyData", data);
        setPrice(data?.policyData);
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {
      instance
        .get(`/api/allpolicy/view`)
        .then(({ data }) => {
          console.log("policyData", data);
          setPrice(data?.policyData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
  }, []);

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

  const { lead } = useContext(Context);

  const [userDetails, setUserDetails] = useState({
    firstName: lead != null ? lead.firstName : "",
    lastName: lead != null ? lead.lastName : "",
    email: lead != null ? lead.email : "",
    phone: lead != null ? lead.phone : "",
    date: lead != null ? lead.date : "",
    make: lead != null ? lead.make : "",
    model: lead != null ? lead.model : "",
    body: lead != null ? lead.body : "",
    year: lead != null ? lead.year : "",
    color: lead != null ? lead.color : "",
    state: lead != null ? lead.state : "",
    address: lead != null ? lead.address : "",
    suburb: lead != null ? lead.suburb : "",
    post: lead != null ? lead.post : "",
    package: lead != null ? lead.package : "",
    policyType: lead != null ? lead.policyType : "",
    insurance: lead != null ? lead.insurance : "",
    packagePrice: lead != null ? lead.packagePrice : "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const onEdit = (e) => {
    let pricePaid = price.map((value) => {
      if (
        value.policyName === userDetails.insurance &&
        value.policyType === userDetails.policyType &&
        value.packageName === userDetails.package
      ) {
        // console.log("Price", value.pPrice);
        return value.pPrice;
      }
      return "";
    });
    e.preventDefault();
    instance
      .put(
        "/lead/update",
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone,
          date: userDetails.date,
          make: userDetails.make,
          model: userDetails.model,
          body: userDetails.body,
          year: userDetails.year,
          color: userDetails.color,
          state: userDetails.state,
          address: userDetails.address,
          suburb: userDetails.suburb,
          post: userDetails.post,
          insurance: userDetails.insurance,
          package: userDetails.package,
          policyType: userDetails.policyType,
          packagePrice: pricePaid[0],
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
        alert.success("Lead Updated");
        instance
          .post(`/add/notification`, {
            userId: userDetails?.firstName,
            category: "Edited Lead",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Edited Success");
          })
          .catch((err) => {
            console.log("Error in Edited", err);
          });
        history.push("/lead");
        setUserDetails({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          date: "",
          make: "",
          model: "",
          body: "",
          year: "",
          color: "",
          state: "",
          address: "",
          suburb: "",
          post: "",
          package: "",
          policyType: "",
          insurance: "",
          packagePrice: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  if (lead == null) {
    return <Redirect to="/lead" />;
  }

  return (
    <div>
      <Header />
      <div
        className="main-content-wrap sidenav-open d-flex flex-column"
        style={{ backgroundColor: "#E8ECF1" }}
      >
        <h2>Lead Edit</h2>
        <div className="row">
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter first name"
                value={userDetails.firstName}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter last name"
                value={userDetails.lastName}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Email
              </label>
              <input
                id="email"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Phone
              </label>
              <input
                id="phone"
                style={{ width: "300px" }}
                type="number"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter phone"
                value={userDetails.phone}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Start Date
              </label>
              <input
                id="date"
                style={{ width: "300px" }}
                type="date"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter date"
                value={userDetails.date}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Make
              </label>
              <input
                id="make"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter make"
                value={userDetails.make}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Model
              </label>
              <input
                id="model"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter model"
                value={userDetails.model}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Body
              </label>
              <input
                id="body"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter body"
                value={userDetails.body}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Suburb
              </label>
              <input
                id="suburb"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter suburb"
                value={userDetails.suburb}
                onChange={handleChange}
              />

              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Package
              </label>
              <select
                id="package"
                style={{ width: "300px" }}
                value={userDetails.package}
                onChange={handleChange}
                className="custom-select mb-2"
              >
                <option value="">Select Package</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.packageName}>
                      {value.packageName}
                    </option>
                  ))}
              </select>
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Year
              </label>
              <input
                id="year"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter year"
                value={userDetails.year}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Color
              </label>
              <input
                id="color"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter color"
                value={userDetails.color}
                onChange={handleChange}
              />
              <label htmlFor="email" className="mr-sm-2">
                Insurance
              </label>
              <select
                id="insurance"
                style={{ width: "300px" }}
                value={userDetails.insurance}
                onChange={handleChange}
                className="custom-select mb-2"
              >
                <option value="">Select Insurance</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.policyName}>
                      {value.policyName}
                    </option>
                  ))}
              </select>

              <label htmlFor="email" className="mr-sm-2">
                Policy Type
              </label>
              <select
                id="policyType"
                style={{ width: "300px" }}
                value={userDetails.policyType}
                onChange={handleChange}
                className="custom-select mb-2"
              >
                <option value="">Select Price</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.policyType}>
                      {value.policyType}
                    </option>
                  ))}
              </select>
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                State
              </label>
              <input
                id="state"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter state"
                value={userDetails.state}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Address
              </label>
              <input
                id="address"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter address"
                value={userDetails.address}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Post
              </label>
              <input
                id="post"
                style={{ width: "300px" }}
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter post"
                value={userDetails.post}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <br />
        <button
          onClick={onEdit}
          style={{ width: "200px", paddingLeft: "20px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
