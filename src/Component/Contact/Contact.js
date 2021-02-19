import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import instance from "../../Instance";
import moment from "moment";

const Contact = () => {
  const [oneview, setOneView] = useState(null);

  useEffect(() => {
    instance
      .get(`/all/contact/view`)
      .then(({ data }) => {
        console.log("contact", data);
        setOneView(data?.contactData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Contact From</h2>
        <table class="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: "#00a65a73" }}>
              <th scope="col">Id</th>
              <th scope="col">Date and Time</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Messege</th>
            </tr>
          </thead>
          <tbody>
            {oneview != null &&
              oneview.map((value, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                    <br />
                    {new Date(value.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{value.firstName}</td>
                  <td>{value.lastName}</td>
                  <td>{value.email}</td>
                  <td>{value.phone}</td>
                  <td>{value.messege}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contact;
