import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import instance from "../../Instance";
import moment from "moment";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Customer = () => {
  const history = useHistory();
  const alert = useAlert();
  const [loader, setloader] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerFilter, setCustomerFilter] = useState([]);
  const [policy, setPolicy] = useState([]);

  const [active, setActive] = useState(false);
  const [reload, setReload] = useState(false);
  const [clickButtonId, setClickButtonId] = useState(-1);

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

  // useEffect(() => {
  //   instance
  //     .get("/api/customer/data", {
  //       headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
  //     })
  //     .then(({ data }) => {
  //       console.log("data", data);
  //       let temp = data.customerData;
  //       temp.reverse();
  //       setCustomerDetails(temp);
  //       setCustomerFilter(temp);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, [reload]);

  useEffect(() => {
    setloader(true);
    instance
      .get(`/policyno/customer/view`)
      .then(({ data }) => {
        console.log("insurancessss", data);
        let temp = data?.data;
        temp.reverse();
        setCustomerDetails(temp);
        setPolicy(temp);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [reload]);

  const handelDelite = async (value, e) => {
    setCustomerDetails(customerDetails.filter((temp) => temp._id != value._id));
    setPolicy(policy.filter((temp) => temp._id != value._id));
    alert.success("Customer Deleted");
    await instance
      .post(
        `/customer/send/${value.insurance._id}`,
        {
          date: value.insurance.createdAt,
          name: value.insurance.name,
          type: value.insurance.type,
          address: value.insurance.address,
          suburb: value.insurance.suburb,
          post: value.insurance.post,
          email: value.insurance.email,
          phone: value.insurance.phone,
          year: value.insurance.year,
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
            userId: value.insurance.name,
            policyNo: policy?.policyNo,
            category: "Deleted Customer",
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

  const Add = () => {
    history.push("/customeradd");
  };

  const customerHistory = () => {
    history.push("/customerHistory");
  };

  const Active = (value, i) => {
    setClickButtonId(i);
    instance
      .put(`/customer/status/view/${value.insurance._id}`)
      .then(() => {
        console.log("Update Transfer");
        setReload(!reload);
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  const Driver = () => {
    history.push("/customerdriver");
  };

  const Detail = (id) => {
    history.push(`/customerdetail/${id}`);
  };

  const ref = React.createRef();

  const options = {
    unit: "in",
    // format: [500,500]
  };

  const ClaimHistory = () => {
    history.push(`/chistory`);
  };
  const DriverHistory = () => {
    history.push(`/driverhistory`);
  };

  const InsuranceHistory = () => {
    history.push(`/ihistory`);
  };

  const [searchText, setSearchText] = useState("");

  const search = (event) => {
    setPolicy(
      customerDetails.filter(
        (user) =>
          (user?.insurance?.name)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1 ||
          (user?.policyNo)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      )
    );

    setSearchText(event.target.value);
  };
  console.log("customer gfgfgf", customerDetails);
  console.log("customer ", policy);
  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Customer</h2>
        <div className="row">
          <button
            onClick={Add}
            style={{ width: "150px" }}
            type="button"
            className="btn btn-success"
          >
            Add Customer
          </button>
          {/* <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-danger"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excel"
            style={{ width: "150px" }}
          /> */}
          {/* <Pdf
            targetRef={ref}
            filename="example.pdf"
            options={options}
            x={0.2}
            y={0.5}
            scale={0.6}
          >
            {({ toPdf }) => (
              <button
                style={{ width: "100px" }}
                type="button"
                className="btn btn-success"
                onClick={toPdf}
              >
                Pdf
              </button>
            )}
          </Pdf> */}
          <button
            onClick={customerHistory}
            style={{ width: "200px" }}
            type="button"
            className="btn btn-danger"
          >
            Customer History
          </button>
          <button
            onClick={InsuranceHistory}
            style={{ width: "200px" }}
            type="button"
            class="btn btn-success"
          >
            Insurance History
          </button>
          <button
            onClick={ClaimHistory}
            style={{ width: "200px" }}
            type="button"
            class="btn btn-danger"
          >
            Claim History
          </button>
          <button
            onClick={DriverHistory}
            type="button"
            class="btn btn-success"
            style={{ width: "200px" }}
          >
            Driver History
          </button>
          <input
            value={searchText}
            onChange={search}
            style={{ width: "300px" }}
            type="search"
            className="form-control mr-sm-2 button2 ml-auto"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
        </div>

        <br />
        {loader ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border"></div>
          </div>
        ) : (
          <div style={{ overflowX: "scroll" }}>
            <table className="table" ref={ref} id="table-to-xls">
              <thead style={{ backgroundColor: "#00a65a73" }}>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Policy No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  {/* <th scope="col">Address</th> */}
                  {/* <th scope="col">Suburb</th>
          <th scope="col">Pin</th> */}
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Active/Deactve</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {policy != null &&
                policy.map((value, i) => (
                  <tbody key={i}>
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>
                        {" "}
                        <a onClick={() => Detail(value._id)}>
                          {moment(new Date(value?.insurance?.createdAt)).format(
                            "DD/MM/YYYY"
                          )}
                          <br />
                          {new Date(
                            value?.insurance?.createdAt
                          ).toLocaleTimeString()}
                        </a>
                      </td>
                      <td>
                        <a onClick={() => Detail(value.insurance._id)}>
                          {value.policyNo}
                        </a>
                      </td>
                      <td>
                        <a onClick={() => Detail(value.insurance._id)}>
                          {value.insurance.name}
                        </a>
                      </td>
                      <td>
                        {" "}
                        <a onClick={() => Detail(value.insurance._id)}>
                          {value.insurance.type}
                        </a>
                      </td>
                      {/* <td>{value.address}</td> */}
                      {/* <td>{value.suburb}</td>
          <td>{value.post}</td> */}
                      <td>
                        {" "}
                        <a onClick={() => Detail(value.insurance._id)}>
                          {value.insurance.email}
                        </a>
                      </td>
                      <td>
                        {" "}
                        <a onClick={() => Detail(value.insurance._id)}>
                          {value.insurance.phone}
                        </a>
                      </td>
                      <td>
                        {value.insurance.status == true ? (
                          <button
                            onClick={() => Active(value, i)}
                            type="button"
                            style={{ width: "100px" }}
                            className="btn btn-success"
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            onClick={() => Active(value, i)}
                            type="button"
                            style={{ width: "100px" }}
                            className="btn btn-danger"
                          >
                            Deactive
                          </button>
                        )}
                      </td>
                      <td>
                        <svg
                          onClick={(e) => handelDelite(value, e)}
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-trash-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                          />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
