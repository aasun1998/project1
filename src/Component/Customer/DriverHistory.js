import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";
import moment from "moment";

export default function DriverHistory() {
  const [historyDetails, setHistoryDetails] = useState([]);
  const [leadFilter, setLeadFilter] = useState([]);

  useEffect(() => {
    instance
      .get("/all/driver/history/view")
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.driverData;
        temp.reverse();
        setHistoryDetails(temp);
        setLeadFilter(temp);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log("vvvvvvvv", historyDetails);
  console.log("wwwwwwww", leadFilter);
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

  const handelSend = async (value, e) => {
    e.preventDefault();
    setHistoryDetails(historyDetails.filter((temp) => temp._id != value._id));

    await instance
      .post(`/driver/history/${value._id}`, {
        name: value.name,
        vehicle: value.vehicle,
        mobile: value.mobile,
        address: value.address,
        post: value.post,
        suburb: value.suburb,
        birthdate: value.birthdate,
        licenceno: value.licenceno,
        licenceexpiry: value.licenceexpiry,
        customerId: value.customerId,
      })
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            userId: value.name,
            category: "Deleted Driver",
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

  const [searchText, setSearchText] = useState("");

  const search = (event) => {
    setHistoryDetails(
      leadFilter.filter(
        (user) =>
          (user?.owner)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1 ||
          (user?.policyNo)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1 ||
          (user?.name)
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      )
    );

    setSearchText(event.target.value);
  };

  return (
    <div>
      <div>
        <Header />
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <h2>Driver History</h2>
          <input
            value={searchText}
            onChange={search}
            style={{ width: "300px" }}
            className="form-control mr-sm-2 button2 ml-auto"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <br />
          <div style={{ overflowX: "scroll" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Joining Time</th>
                  <th scope="col">Remove Time</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Policy No</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">Vehicle</th>
                  {/* <th scope="col">Mobile</th> */}
                  <th scope="col">Address</th>
                  <th scope="col">Post</th>
                  <th scope="col">Suburb</th>
                  {/* <th scope="col">Birth Date</th> */}
                  <th scope="col">Licence No</th>
                  <th scope="col">Licence Expiry</th>
                  {/* <th scope="col">Acion</th> */}
                </tr>
              </thead>
              <tbody>
                {historyDetails.map((value, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      {moment(new Date(value.joinTime)).format("DD/MM/YYYY")}
                      <br />
                      {new Date(value.joinTime).toLocaleTimeString()}
                    </td>
                    <td>
                      {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                      <br />
                      {new Date(value.createdAt).toLocaleTimeString()}
                    </td>
                    <td>{value.owner}</td>
                    <td>{value.policyNo}</td>
                    <td>{value.name}</td>
                    <td>{value.vehicle}</td>
                    {/* <td>{value.mobile}</td> */}
                    <td>{value.address}</td>
                    <td>{value.post}</td>
                    <td>{value.suburb}</td>
                    {/* <td>{value.birthdate}</td> */}
                    <td>{value.licenceno}</td>
                    <td>{value.licenceexpiry}</td>
                    {/* <td>
                      <svg
                        onClick={(e) => handelSend(value, e)}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-arrow-bar-up"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
