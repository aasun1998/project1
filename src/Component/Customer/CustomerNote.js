import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import instance from "../../Instance";

export default function CustomerNote() {
  const history = useHistory();
  const params = useParams();
  const alert = useAlert();
  useEffect(() => {
    console.log("id", params.id);
  }, []);

  const [oneview, setOneView] = useState(null);
  const [customerview, setCustomerView] = useState([]);
  const [insuranceview, setInsuranceView] = useState([]);

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
      .get(`/customer/details/view/${params.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token$")}`,
        },
      })
      .then(({ data }) => {
        console.log("customerdata", data);
        setCustomerView(data?.data[0]);
        setInsuranceView(data?.data[0]?.insuranceDetails[0]?._id);

        // setInsuranceFilter(data?.data[0].insuranceDetails)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [customerNote, setCustomerNote] = useState({
    note: "",
    date: "",
    created: "",
  });

  const handleChange = (event) => {
    setCustomerNote({
      ...customerNote,
      [event.target.id]: event.target.value,
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    instance
      .post(
        `/customer/note/${params.id}`,
        {
          note: customerNote.note,
          date: customerNote.date,
          created: customerNote.created,
          // _id: params.id
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then((result) => {
        console.log("fff", result);
        alert.success("Note Added");
        instance
          .post(`/add/notification`, {
            userId: customerview?.name,
            policyNo: customerNote?.note,
            category: "Added CustomerNote",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Note Success");
          })
          .catch((err) => {
            console.log("Error in Note", err);
          });
        setCustomerNote({
          note: "",
          date: "",
          created: "",
        });
        history.push(`/customerdetail/${params.id}`);
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Customer Note Add</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Note
              </label>
              <input
                style={{ width: "300px" }}
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter note"
                id="note"
                value={customerNote.note}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2 text-left"
              >
                Date
              </label>
              <input
                style={{ width: "300px" }}
                type="date"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter date"
                id="date"
                value={customerNote.date}
                onChange={handleChange}
              />
            </form>
          </div>
          {/* <form>
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Created By</label>
  <input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter asign" id="created"  value={customerNote.created} onChange={handleChange} />
</form> */}
        </div>
        <br />
        <button
          onClick={onAdd}
          style={{ width: "200px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
