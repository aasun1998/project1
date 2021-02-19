import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import instance from "../../Instance";
import moment from "moment";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    instance
      .get("/all/notification/view")
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.notificationData;
        temp.reverse();
        setNotification(temp);
        setPolicy(temp);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [searchText, setSearchText] = useState("");

  const search = (event) => {
    setNotification(
      policy.filter(
        (user) =>
          (user?.adminId)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1 ||
          (user?.userId)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1 ||
          (user?.createdAt)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      )
    );

    setSearchText(event.target.value);
  };
  // console.log("customer gfgfgf", notification);
  // console.log("customer ", policy);
  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <div>
          <input
            value={searchText}
            onChange={search}
            style={{ width: "300px" }}
            type="search"
            className="form-control mr-sm-2 button2 ml-auto"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <h2>Notification Panel</h2>
        <table class="table table-bordered">
          <thead style={{ backgroundColor: "#00a65a73" }}>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Admin</th>
              <th scope="col">Changes</th>
              <th scope="col">User</th>
              <th scope="col">Policy No</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {notification != null &&
              notification.map((value, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                    <br />
                    {new Date(value.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{value.adminId}</td>
                  <td>{value.category}</td>
                  <td>{value.userId}</td>
                  <td>{value.policyNo}</td>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
