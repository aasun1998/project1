import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import Context from "./Context";
import Pdf from "react-to-pdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./Lead.css";
import moment from "moment";
import instance from "../../Instance";
import { useAlert } from "react-alert";

const Lead = () => {
  const alert = useAlert();

  const history = useHistory();

  const [loader, setloader] = useState(false);

  const [leadDetails, setLeadDetails] = useState([]);
  const [leadFilter, setLeadFilter] = useState([]);

  const { setLead } = useContext(Context);

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
      .get("/api/lead/data", {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.leadData;
        temp.reverse();
        setLeadDetails(temp);
        setLeadFilter(temp);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [setLeadDetails.status]);

  const handelDelite = async (value, e) => {
    setLeadDetails(leadDetails.filter((temp) => temp._id !== value._id));
    setLeadFilter(leadFilter.filter((temp) => temp._id !== value._id));

    await instance
      .post(
        `/lead/send/${value._id}`,
        {
          regoNo: value.regoNo,
          firstName: value.firstName,
          middleName: value.middleName,
          lastName: value.lastName,
          dob: value.dob,
          gender: value.gender,
          email: value.email,
          phone: value.phone,
          date: value.date,
          make: value.make,
          model: value.model,
          body: value.body,
          insurance: value.insurance,
          year: value.year,
          color: value.color,
          state: value.state,
          address: value.address,
          suburb: value.suburb,
          post: value.post,
          package: value.package,
          packagePrice: value.packagePrice,
          dFName1: value.dFName1,
          dLName1: value.dLName1,
          dFName2: value.dFName2,
          dLname2: value.dLname2,
          policyType: value.policyType,
          discount: value.discount,
          reason: value.reason,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then(() => {
        console.log("Sucesss Transfer");
        alert.success("Lead Delited");
        instance
          .post(`/add/notification`, {
            userId: value?.firstName,
            category: "Deleted",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Deleted Success");
          })
          .catch((err) => {
            console.log("Error in delete", err);
          });
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };
  const Detail = (id) => {
    history.push(`/details/${id}`);

    instance
      .put(`/status/view/${id}`)
      .then(() => {
        console.log("Update Transfer");
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  const edit = (value) => {
    setLead(value);
    history.push(`/edit/${value._id}`);
  };

  const add = () => {
    history.push("/add");
  };

  const leadHistory = () => {
    history.push("/leadHistory");
  };

  const ref = React.createRef();

  const options = {
    unit: "in",
    format: [500, 500],
  };

  const [searchText, setSearchText] = useState("");

  const search = (event) => {
    setLeadFilter(
      leadDetails.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      )
    );

    setSearchText(event.target.value);
  };

  return (
    <div>
      <Header />

      <div
        className="main-content-wrap sidenav-open d-flex flex-column"
        style={{ backgroundColor: "#E8ECF1" }}
      >
        <h2>Lead</h2>

        <div className="row">
          <button
            onClick={add}
            style={{ width: "100px" }}
            type="button"
            class="btn btn-success"
          >
            Add Lead
          </button>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-danger"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excel"
            style={{ width: "150px" }}
          />
          <Pdf
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
                class="btn btn-success"
                onClick={toPdf}
              >
                Pdf
              </button>
            )}
          </Pdf>
          <button
            onClick={leadHistory}
            style={{ width: "100px" }}
            type="button"
            class="btn btn-danger"
          >
            History
          </button>
          <input
            value={searchText}
            onChange={search}
            style={{ width: "300px" }}
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
                  <th scope="col">Date and Time</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Email</th>
                  {/* <th scope="col">Mobile</th> */}
                  {/* <th scope="col">Policy Start Date</th> */}
                  {/* <th scope="col">Make</th>
    <th scope="col">Model</th>
    <th scope="col">Body</th>
    <th scope="col">Year</th>
    <th scope="col">Color</th>
    <th scope="col">State</th>
    <th scope="col">Address</th>
    <th scope="col">Suburb</th>
    <th scope="col">Pin</th> */}
                  <th scope="col">Package</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {leadFilter.map((value, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>
                      {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                      <br />
                      {new Date(value.createdAt).toLocaleTimeString()}
                    </td>
                    <td>
                      <p onClick={() => Detail(value._id)}>{value.firstName}</p>
                    </td>
                    <td>
                      {" "}
                      <p onClick={() => Detail(value._id)}>{value.lastName}</p>
                    </td>
                    <td>
                      {" "}
                      <p onClick={() => Detail(value._id)}>{value.email}</p>
                    </td>
                    {/* <td>{value.phone}</td> */}
                    {/* <td>{value.date}</td> */}
                    {/* <td>{value.make}</td>
     <td>{value.model}</td>
     <td>{value.body}</td>
     <td>{value.year}</td>
     <td>{value.color}</td>
     <td>{value.state}</td>
     <td>{value.address}</td>
     <td>{value.suburb}</td>
     <td>{value.pin}</td> */}
                    <td>
                      {" "}
                      <p onClick={() => Detail(value._id)}>{value.package}</p>
                    </td>
                    <td>
                      {value.status === true ? (
                        <button
                          type="button"
                          style={{ width: "100px" }}
                          class="btn btn-danger"
                        >
                          New
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{ width: "100px" }}
                          class="btn btn-success"
                        >
                          Read
                        </button>
                      )}
                    </td>
                    <td>
                      <svg
                        onClick={() => edit(value)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-pencil-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                        />
                      </svg>
                      <br />
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lead;
