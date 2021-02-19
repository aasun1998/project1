import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";
import { useAlert } from "react-alert";
import "./Lead.css";
import mixpanel from "mixpanel-browser";
import { useHistory } from "react-router-dom";

export default function AddLead() {
  const alert = useAlert();
  const history = useHistory();

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

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    phoneError: false,
    insuranceError: false,
    policyTypeError: false,
    packageError: false,
  });

  const [userDetails, setUserDetails] = useState({
    regoNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    date: "",
    make: "",
    model: "",
    body: "",
    insurance: "",
    year: "",
    color: "",
    state: "",
    address: "",
    suburb: "",
    post: "",
    package: "",
    packagePrice: "",
    dFName1: "",
    dLName1: "",
    dFName2: "",
    dLname2: "",
    policyType: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value,
    });
  };

  const HandleValidation = () => {
    if (userDetails.firstName === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: true,
          // firstNameError: false,
          lastNameError: false,
          emailError: false,
          phoneError: false,
          insuranceError: false,
          policyTypeError: false,
          packageError: false,
        };
      });

      if (userDetails.lastName === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            lastNameError: true,
          };
        });
      }
      if (userDetails.email === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            emailError: true,
          };
        });
      }
      if (userDetails.phone === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            phoneError: true,
          };
        });
      }
      if (userDetails.package === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            packageError: true,
          };
        });
      }
      if (userDetails.insurance === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            insuranceError: true,
          };
        });
      }
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.lastName === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: true,
          emailError: false,
          phoneError: false,
          insuranceError: false,
          policyTypeError: false,
          packageError: false,
        };
      });

      if (userDetails.email === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            emailError: true,
          };
        });
      }
      if (userDetails.phone === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            phoneError: true,
          };
        });
      }
      if (userDetails.package === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            packageError: true,
          };
        });
      }
      if (userDetails.insurance === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            insuranceError: true,
          };
        });
      }
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.email === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: false,
          emailError: true,
          phoneError: false,
          insuranceError: false,
          policyTypeError: false,
          packageError: false,
        };
      });

      if (userDetails.phone === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            phoneError: true,
          };
        });
      }
      if (userDetails.package === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            packageError: true,
          };
        });
      }
      if (userDetails.insurance === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            insuranceError: true,
          };
        });
      }
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.phone === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: false,
          emailError: false,
          phoneError: true,
          insuranceError: false,
          policyTypeError: false,
          packageError: false,
        };
      });

      if (userDetails.package === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            packageError: true,
          };
        });
      }
      if (userDetails.insurance === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            insuranceError: true,
          };
        });
      }
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.package === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: false,
          emailError: false,
          phoneError: false,
          insuranceError: false,
          policyTypeError: false,
          packageError: true,
        };
      });

      if (userDetails.insurance === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            insuranceError: true,
          };
        });
      }
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.insurance === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: false,
          emailError: false,
          phoneError: false,
          insuranceError: true,
          policyTypeError: false,
          packageError: false,
        };
      });
      if (userDetails.policyType === "") {
        setErrors((prevError) => {
          return {
            ...prevError,
            policyTypeError: true,
          };
        });
      }
    } else if (userDetails.policyType === "") {
      setErrors((prevError) => {
        return {
          ...prevError,
          firstNameError: false,
          lastNameError: false,
          emailError: false,
          phoneError: false,
          insuranceError: false,
          policyTypeError: true,
          packageError: false,
        };
      });
    } else {
      onAdd();
    }
  };

  const onAdd = () => {
    let tempPremiumName = 0;
    let pricePaid = price.map((value) => {
      if (
        value.policyName === userDetails.insurance &&
        value.packageName === userDetails.package
      ) {
        // console.log("Price", value.pPrice);
        return (tempPremiumName = value.pPrice);
      }
      return "";
    });
    // e.preventDefault();
    instance
      .post("/api/account/lead", {
        regoNo: userDetails.regoNo,
        firstName: userDetails.firstName,
        middleName: userDetails.middleName,
        lastName: userDetails.lastName,
        dob: userDetails.dob,
        gender: userDetails.gender,
        email: userDetails.email,
        phone: userDetails.phone,
        date: userDetails.date,
        make: userDetails.make,
        model: userDetails.model,
        body: userDetails.body,
        insurance: userDetails.insurance,
        year: userDetails.year,
        color: userDetails.color,
        state: userDetails.state,
        address: userDetails.address,
        suburb: userDetails.suburb,
        post: userDetails.post,
        package: userDetails.package,
        packagePrice: tempPremiumName,
        dFName1: userDetails.dFName1,
        dLName1: userDetails.dLName1,
        dFName2: userDetails.dFName2,
        dLname2: userDetails.dLname2,
        policyType: userDetails.policyType,
      })
      .then((result) => {
        console.log("fff", result);
        alert.success("Lead Added");

        mixpanel.track("Lead", {
          date: Date.now(),
        });

        instance
          .post(`/add/notification`, {
            userId: userDetails?.firstName,
            category: "Added Lead",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Added Success");
          })
          .catch((err) => {
            console.log("Error in Added", err);
          });
        history.push("/lead");
        setUserDetails({
          regoNo: "",
          firstName: "",
          middleName: "",
          lastName: "",
          dob: "",
          gender: "",
          email: "",
          phone: "",
          date: "",
          make: "",
          model: "",
          body: "",
          insurance: "",
          year: "",
          color: "",
          state: "",
          address: "",
          suburb: "",
          post: "",
          package: "",
          packagePrice: "",
          dFName1: "",
          dLName1: "",
          dFName2: "",
          dLname2: "",
          policyType: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const widget = null;
  const address_line_1 = React.createRef();
  const suburb = React.createRef();
  const state = React.createRef();
  const postcode = React.createRef();

  // useEffect(() => {
  //   var script = document.createElement("script");
  //   script.src = "https://api.addressfinder.io/assets/v3/widget.js";
  //   script.async = true;
  //   script.onload = loadWidget;
  //   document.body.appendChild(script);
  // }, []);

  // useEffect(() => {
  //   if (widget) {
  //     widget.destroy();
  //     widget = null;
  //   }
  // }, []);

  // const loadWidget = () => {
  //   widget = new AddressFinder.Widget(
  //     document.getElementById("address_line_1"),
  //     "QEGD6FXWJUK8479VCLYP",
  //     "AU"
  //   );
  //   widget.on("result:select", (fullAddress, metaData) => {
  //     address_line_1.current.value = metaData.address_line_1;
  //     suburb.current.value = metaData.locality_name;
  //     state.current.value = metaData.state_territory;
  //     postcode.current.value = metaData.postcode;
  //   });
  // };

  return (
    <div>
      <Header />
      <div
        className="main-content-wrap sidenav-open d-flex flex-column"
        style={{ backgroundColor: "#E8ECF1" }}
      >
        <h2>Add Lead</h2>

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
              {errors.firstNameError && (
                <label style={{ color: "red" }}>Enter Your First Name</label>
              )}
              <input
                id="firstName"
                style={{ width: "300px" }}
                type="text"
                className={
                  errors.firstNameError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
                placeholder="Enter firstname"
                value={userDetails.firstName}
                onChange={handleChange}
              />

              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                style={{ width: "300px" }}
                type="date"
                className="form-control mb-2 mr-sm-2"
                min="new Date().toDateString()"
                placeholder="Enter date"
                value={userDetails.dob}
                onChange={handleChange}
              />

              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Gender
              </label>
              <select
                id="gender"
                style={{ width: "300px" }}
                value={userDetails.gender}
                onChange={handleChange}
                className="form-control mb-2 mr-sm-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter model"
                value={userDetails.model}
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
                Middle Name
              </label>

              <input
                id="middleName"
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter midle name"
                value={userDetails.middleName}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Email
              </label>
              {errors.emailError && (
                <label style={{ color: "red" }}>Enter Your Email</label>
              )}
              <input
                id="email"
                style={{ width: "300px" }}
                type="email"
                className={
                  errors.emailError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Rego No
              </label>
              <input
                id="regoNo"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter rego no"
                value={userDetails.regoNo}
                onChange={handleChange}
              />
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
                min="new Date().toDateString()"
                placeholder="Enter date"
                value={userDetails.date}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Last Name
              </label>
              {errors.lastNameError && (
                <label style={{ color: "red" }}>Enter Your Last Name</label>
              )}
              <input
                id="lastName"
                style={{ width: "300px" }}
                type="text"
                className={
                  errors.lastNameError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
                placeholder="Enter lastname"
                value={userDetails.lastName}
                onChange={handleChange}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Phone
              </label>
              {errors.phoneError && (
                <label style={{ color: "red" }}>Enter Your Phone</label>
              )}
              <input
                id="phone"
                style={{ width: "300px" }}
                type="number"
                className={
                  errors.phoneError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
                placeholder="Enter phone"
                value={userDetails.phone}
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter make"
                value={userDetails.make}
                onChange={handleChange}
              />
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter state"
                value={userDetails.state}
                onChange={handleChange}
                ref={state}
              />
            </form>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-4">
            <form className="row2">
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
                type="text"
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter suburb"
                value={userDetails.suburb}
                onChange={handleChange}
                ref={suburb}
              />
              <label
                style={{ width: "100px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Package
              </label>
              {errors.packageError && (
                <label style={{ color: "red" }}>Enter Your Package</label>
              )}
              <select
                id="package"
                style={{ width: "300px" }}
                value={userDetails.package}
                onChange={handleChange}
                className={
                  errors.packageError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
              >
                <option value="">Select Package</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.packageName}>
                      {value.packageName}
                    </option>
                  ))}
              </select>

              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Driver First Name
              </label>
              <input
                id="dFName1"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter first name"
                value={userDetails.dFName1}
                onChange={handleChange}
              />
              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Driver Last Name
              </label>
              <input
                id="dLname2"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter last name"
                value={userDetails.dLname2}
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
                Year
              </label>
              <input
                id="year"
                style={{ width: "300px" }}
                type="number"
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
              {errors.insuranceError && (
                <label style={{ color: "red" }}>Enter Your Insurance</label>
              )}
              <select
                id="insurance"
                style={{ width: "300px" }}
                value={userDetails.insurance}
                onChange={handleChange}
                className={
                  errors.insuranceError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
              >
                <option value="">Select Insurance</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.policyName}>
                      {value.policyName}
                    </option>
                  ))}
              </select>
              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Driver Last Name
              </label>
              <input
                id="dLName1"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter last name"
                value={userDetails.dLName1}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-4">
            <form className="row2">
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
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter address"
                value={userDetails.address}
                onChange={handleChange}
                ref={address_line_1}
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
                type="number"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter post"
                value={userDetails.post}
                onChange={handleChange}
                ref={postcode}
              />
              <label
                style={{ width: "200px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Policy Type
              </label>
              {errors.policyTypeError && (
                <label style={{ color: "red" }}>Enter Your Policy</label>
              )}
              <select
                id="policyType"
                style={{ width: "300px" }}
                value={userDetails.policyType}
                onChange={handleChange}
                className={
                  errors.policyTypeError === true
                    ? "form-control mb-2 mr-sm-2 error_border"
                    : "form-control mb-2 mr-sm-2"
                }
              >
                <option value="">Select Package</option>
                {price &&
                  price.map((value, i) => (
                    <option key={i} value={value.policyType}>
                      {value.policyType}
                    </option>
                  ))}
              </select>

              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Driver First Name
              </label>
              <input
                id="dFName2"
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter fist name"
                value={userDetails.dFName2}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <br />
        <button
          onClick={HandleValidation}
          style={{ width: "200px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}
