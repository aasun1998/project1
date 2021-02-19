import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";

const InsuranceSetting = () => {
  const { setSetting } = useContext(Context);
  const history = useHistory();
  const [allleaddetails, setAllLeadDetails] = useState(null);
  const [allleadfilter, setAllLeadFilter] = useState([]);

  useEffect(() => {
    instance
      .get(`/api/allpolicy/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("policyData", data);
        setAllLeadDetails(data?.policyData);
        setAllLeadFilter(data?.policyData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const AddBlog = () => {
    history.push(`/addinsurances`);
  };

  const onEdit = (value) => {
    setSetting(value);
    // console.log(setCustomer)
    history.push(`/iedit/${value._id}`);
  };

  const handelDelite = async (value, e) => {
    setAllLeadDetails(allleaddetails.filter((temp) => temp._id != value._id));
    setAllLeadFilter(allleadfilter.filter((temp) => temp._id != value._id));
    // alert.success("Customer Deleted");
    await instance
      .post(`/setting/insurance/delite/${value._id}`)
      .then(() => {
        console.log("Sucesss Delite");
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Insurance Setting</h2>
        <div className="row">
          <button
            style={{ marginLeft: "15px" }}
            onClick={AddBlog}
            type="button"
            class="btn btn-primary"
          >
            Add Insurance
          </button>
        </div>
        <br />
        <div style={{ overflowX: "scroll" }}>
          <table class="table table-bordered">
            <thead style={{ backgroundColor: "#7FCDAD" }}>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Policy Name</th>
                {/* <th scope="col">Policy Type</th> */}
                <th scope="col">Policy Month</th>
                <th scope="col">Policy Detail</th>
                <th scope="col">Package Name</th>
                <th scope="col">Excess</th>
                <th scope="col">Policy Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {allleaddetails &&
              allleaddetails.map((value, i) => (
                <tbody key={i}>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{value.policyName}</td>
                    {/* <td>{value.policyType}</td> */}
                    <td>{value.policyMonth}</td>
                    <td>{value.policyDetail}</td>
                    <td>{value.packageName}</td>
                    <td>{value.excess}</td>
                    <td>{value.pPrice}</td>
                    <td>
                      <svg
                        onClick={() => onEdit(value)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-pencil-square"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <br />
                      <svg
                        onClick={(e) => handelDelite(value, e)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-archive"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSetting;
