import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";

export default function Ihistory() {
  const [historyDetails, setHistoryDetails] = useState([]);

  useEffect(() => {
    instance
      .get("/insurance/history/view", {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.insuranceHistoryData;
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
    e.preventDefault();
    setHistoryDetails(historyDetails.filter((temp) => temp._id != value._id));

    await instance
      .post(`/history/insurance/${value._id}`, {
        policyNo: value.policyNo,
        policyType: value.policyType,
        overdue: value.overdue,
        pdf: value.pdf,
        valueInsured: value.valueInsured,
        valuationType: value.valuationType,
        discount: value.discount,
        status: value.status,
        reason: value.reason,
        package: value.package,
        cardNo: value.cardNo,
        validity: value.validity,
        insuranceType: value.insuranceType,
        premium: value.premium,
        excess: value.excess,
        period: value.period,
        startDate: value.startDate,
        endDate: value.endDate,
        nextPaymentDue: value.nextPaymentDue,
        customerId: value.customerId,
      })
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            policyNo: value.policyNo,
            category: "Deleted Insurance History",
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
          <h2>Insurance History</h2>
          <div style={{ overflowX: "scroll" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">policyNo</th>
                  <th scope="col">policyType</th>
                  <th scope="col">overdue</th>
                  <th scope="col">insuranceType</th>
                  <th scope="col">premium</th>
                  <th scope="col">excess</th>
                  <th scope="col">period</th>
                  <th scope="col">startDate</th>
                  <th scope="col">endDate</th>
                  <th scope="col">nextPaymentDue</th>
                  <th scope="col">Acion</th>
                </tr>
              </thead>
              <tbody>
                {historyDetails.map((value, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>{value.policyNo}</td>
                    <td>{value.policyType}</td>
                    <td>{value.overdue}</td>
                    <td>{value.insuranceType}</td>
                    <td>{value.premium}</td>
                    <td>{value.excess}</td>
                    <td>{value.period}</td>
                    <td>{value.startDate}</td>
                    <td>{value.endDate}</td>
                    <td>{value.nextPaymentDue}</td>
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
