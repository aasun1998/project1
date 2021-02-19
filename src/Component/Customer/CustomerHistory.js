import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useAlert } from "react-alert";
import instance from "../../Instance";
import moment from "moment";

export default function CustomerHistory() {
  const [historyDetails, setHistoryDetails] = useState([]);
  const alert = useAlert();

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
    instance
      .get("/customerHistory/view", {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.customerHistoryData;
        temp.reverse();
        setHistoryDetails(temp);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handelSend = async (value, e) => {
    setHistoryDetails(historyDetails.filter((temp) => temp._id != value._id));

    await instance
      .post(
        `/customerHistory/send/${value._id}`,
        {
          date: value.date,
          name: value.name,
          type: value.type,
          address: value.address,
          suburb: value.suburb,
          post: value.post,
          email: value.email,
          phone: value.phone,
          year: value.year,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then(() => {
        console.log("Sucesss Transfer");
        alert.success("Customer History Deleted");
        instance
          .post(`/add/notification`, {
            userId: value.name,
            category: "Deleted CustomerHistory",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Note Success");
          })
          .catch((err) => {
            console.log("Error in Note", err);
          });
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  return (
    <div>
      <div>
        <Header />
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <h2>Customer History</h2>
          <div style={{ overflow: "scroll" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Address</th>
                  {/* <th scope="col">Suburb</th>
      <th scope="col">Post</th> */}
                  {/* <th scope="col">Email</th> */}
                  <th scope="col">Phone</th>
                  <th scope="col">Acion</th>
                </tr>
              </thead>
              <tbody>
                {historyDetails.map((value, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      {moment(new Date(value.date)).format("DD/MM/YYYY")}
                      <br />
                      {new Date(value.date).toLocaleTimeString()}
                    </td>
                    <td>{value.name}</td>
                    <td>{value.type}</td>
                    <td>{value.address}</td>
                    {/* <td>{value.suburb}</td>
    <td>{value.post}</td> */}
                    {/* <td>{value.email}</td> */}
                    <td>{value.phone}</td>
                    {/* <td>{value.year}</td> */}
                    <td>
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
                    </td>
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
