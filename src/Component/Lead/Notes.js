import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import instance from "../../Instance";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

export default function Notes() {
  const history = useHistory();
  const alert = useAlert();
  const params = useParams();

  useEffect(() => {
    console.log("id", params.id);
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

  const [leadNote, setLeadNote] = useState({
    note: "",
    date: "",
    description: "",
    asign: "",
  });

  const handleChange = (event) => {
    setLeadNote({
      ...leadNote,
      [event.target.id]: event.target.value,
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    instance
      .post(
        `/lead/note/${params.id}`,
        {
          note: leadNote.note,
          date: leadNote.date,
          description: leadNote.description,
          asign: leadNote.asign,
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
        // console.log(allleaddetails);
        instance
          .post(`/add/notification`, {
            userId: leadNote?.note,
            category: "Added LeadNote",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Note Success");
          })
          .catch((err) => {
            console.log("Error in Note", err);
          });
        history.push(`/details/${params.id}`);
        setLeadNote({
          note: "",
          date: "",
          description: "",
          asign: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };
  /// FUNCTION SUBMIT BUTTON

  // axios post api (`/roue/${id}` , data)

  return (
    <div>
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Lead Note Add</h2>
        <div className="row">
          <div className="col-md-6">
            <form className="row2">
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2"
              >
                Note
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter note"
                id="note"
                value={leadNote.note}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-6">
            <form className="row2">
              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2"
              >
                Date
              </label>
              <input
                style={{ width: "300px" }}
                type="date"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter date"
                id="date"
                value={leadNote.date}
                onChange={handleChange}
              />
            </form>
          </div>

          {/* <form>
  <label style={{width: '300px'}} htmlFor="email" className="mr-sm-2">Description</label>
  <input style={{width: '300px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter description" id="description"  value={leadNote.description} onChange={handleChange}/>
  <label style={{width: '300px'}} htmlFor="pwd" className="mr-sm-2">Asign</label>
  <input style={{width: '300px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter asign" id="asign"  value={leadNote.asign} onChange={handleChange} />
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
