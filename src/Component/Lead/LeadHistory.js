import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";
import { useAlert } from "react-alert";

export default function LeadHistory() {
  const alert = useAlert();
  const [historyDetails, setHistoryDetails] = useState([]);

  useEffect(() => {
    instance
      .get("/leadhistory/view", {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.historyData;
        temp.reverse();
        setHistoryDetails(temp);
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

  const handelSend = async (value, e) => {
    setHistoryDetails(historyDetails.filter((temp) => temp._id != value._id));

    await instance
      .post(
        `/leadHistory/send/${value._id}`,
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
        alert.success("Lead Hostory Deleted");
        instance
          .post(`/add/notification`, {
            userId: value?.firstName,
            category: "Deleted LeadHistory",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Edited Success");
          })
          .catch((err) => {
            console.log("Error in Edited", err);
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
        <div
          className="main-content-wrap sidenav-open d-flex flex-column"
          style={{ backgroundColor: "#E8ECF1" }}
        >
          <h2>Lead History</h2>
          <div style={{ overflowX: "scroll" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Acion</th>
                </tr>
              </thead>
              <tbody>
                {historyDetails.map((value, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
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
