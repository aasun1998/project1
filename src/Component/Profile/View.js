import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";

const View = () => {
  const { setProfile } = useContext(Context);
  const history = useHistory();
  const [view, setView] = useState(null);
  const [viewfilter, setViewFilter] = useState([]);

  useEffect(() => {
    instance
      .get(`/admin/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("admin", data);
        setView(data?.adminData);
        setViewFilter(data?.adminData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const onEdit = (value) => {
    setProfile(value);
    // console.log(setCustomer)
    history.push(`/adminedit/${value._id}`);
  };
  const ChangePassword = (value) => {
    setProfile(value);
    history.push(`/change/${value._id}`);
  };

  const handelDelite = async (value, e) => {
    setView(view.filter((temp) => temp._id != value._id));
    setViewFilter(viewfilter.filter((temp) => temp._id != value._id));
    // alert.success("Customer Deleted");
    await instance
      .post(`/all/admin/delite/${value._id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
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
        <h2>Admin List</h2>
        <div style={{ overflow: "scroll" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Fist Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {view != null &&
                view.map((value, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{value.fName}</td>
                    <td>{value.lName}</td>
                    <td>{value.email}</td>
                    <td>{value.address}</td>
                    <td>{value.phone}</td>
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
                      <br />
                      <img
                        onClick={() => ChangePassword(value)}
                        style={{ width: "1.5em", height: "1.5em" }}
                        src="https://static.thenounproject.com/png/250130-200.png"
                      ></img>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;
