import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Context from "./Context";
import instance from "../../Instance";
import moment from "moment";

export default function Blog() {
  const history = useHistory();
  const [allleaddetails, setAllLeadDetails] = useState(null);
  const [allleadfilter, setAllLeadFilter] = useState([]);
  const [view, setView] = useState([]);
  const { setBlog } = useContext(Context);

  const onValue = (value) => {
    setView(value);
  };

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
      .get(`/blog/post/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("blog", data);
        setAllLeadDetails(data?.blog);
        setAllLeadFilter(data?.blog);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const AddBlog = () => {
    history.push(`/addblog`);
  };
  const Blogpic = () => {};

  const onEdit = (value) => {
    setBlog(value);
    // console.log(setCustomer)
    history.push(`/editblog/${value._id}`);
  };

  const handelDelite = async (value, e) => {
    setAllLeadDetails(allleaddetails.filter((temp) => temp._id != value._id));
    setAllLeadFilter(allleadfilter.filter((temp) => temp._id != value._id));
    // alert.success("Customer Deleted");
    await instance
      .post(`/blog/delite/${value._id}`)
      .then(() => {
        console.log("Sucesss Delite");
        instance
          .post(`/add/notification`, {
            userId: value?.name,
            category: "Deleted",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Deleted Success");
          })
          .catch((err) => {
            console.log("Error in Deleted", err);
          });
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Blog</h2>
        <div className="row">
          <button
            style={{ marginLeft: "15px" }}
            onClick={AddBlog}
            type="button"
            class="btn btn-primary"
          >
            Add Blog
          </button>
        </div>
        <br />
        <table class="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: "#00a65a73" }}>
              <th scope="col">Id</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Picture</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {allleaddetails &&
            allleaddetails.map((value, i) => (
              <tbody key={i}>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                    <br />
                    {new Date(value.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{value.name}</td>
                  <td>{value.description}</td>
                  <td>
                    <img
                      src={`http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/blog/${value.photo}`}
                    />
                    {/* <button
                      type="button"
                      class="btn btn-primary"
                      // style={{ width: "100px" }}
                      onClick={() =>
                        (window.location.href = `http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/blog/${value.photo}`)
                      }
                    >
                      PIC
                    </button> */}
                  </td>
                  <td>
                    <svg
                      onClick={() => onValue(value)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-view-list"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"
                      />
                    </svg>
                    <br />
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

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          View Post
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <label>{view.name}</label>
                        <label>{view.description}</label>
                        <img
                          src={`http://ec2-3-88-91-53.compute-1.amazonaws.com/backend/public/blog/${value.photo}`}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}
