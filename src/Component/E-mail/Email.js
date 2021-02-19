import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import instance from "../../Instance";
import moment from "moment";

const Email = () => {
  const history = useHistory();

  const [showmail, setShowMail] = useState([]);

  useEffect(() => {
    instance
      .get(`/all/mail/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("blog", data);
        setShowMail(data?.mailData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const Sendmail = () => {
    history.push("/sendemail");
  };
  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Mail Service</h2>
        <div className="row">
          <button
            style={{ marginLeft: "10px" }}
            onClick={Sendmail}
            type="button"
            class="btn btn-primary"
          >
            Send Mail
          </button>
        </div>
        <br />
        <div className="row" style={{ marginLeft: "10px" }}>
          <table class="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: "#00a65a73" }}>
                <th scope="col">Id</th>
                <th scope="col">Date and Time</th>
                <th scope="col">Mail To</th>
                <th scope="col">Text</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody>
              {showmail != null &&
                showmail.map((value, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">
                      {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                      <br />
                      {new Date(value.createdAt).toLocaleTimeString()}
                    </th>
                    <td>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">List</th>
                          </tr>
                        </thead>
                        <tbody>
                          {value.toMail != null &&
                            value.toMail.map((value, i) => (
                              <tr key={i}>
                                <th>{value}</th>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                    <td>{value.text}</td>
                    <td>{value.subject}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Email;
