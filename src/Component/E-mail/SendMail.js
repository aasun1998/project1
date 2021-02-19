import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";

const SendMail = () => {
  const [allleaddetails, setAllLeadDetails] = useState([]);
  const [allmaildetails, setAllMailDetails] = useState([]);

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

  const [all, setAll] = useState([]);

  useEffect(() => {
    instance
      .get(`/all/customer/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("blog", data);
        setAllLeadDetails(data?.customerData);
        setAllMailDetails(data?.customerData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [mail, sendMail] = useState({
    toMail: [],
    subject: "",
    text: "",
  });

  const onAdd = (e) => {
    e.preventDefault();
    instance
      .post("/add/mail", {
        toMail: mail.toMail,
        subject: mail.subject,
        text: mail.text,
      })
      .then((result) => {
        // alert.success("Blog Added");
        instance
          .post(`/add/notification`, {
            userId: JSON.stringify(mail.toMail),
            category: "Mailed To",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Mailed Success");
          })
          .catch((err) => {
            console.log("Error in Mailed", err);
          });
        sendMail({
          toMail: [],
          subject: "",
          text: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const handleChange = (e) => {
    sendMail({
      ...mail,
      [e.target.id]: e.target.value,
    });
  };

  const handleIndustries = (e, value) => {
    if (e.target.checked === true) {
      mail.toMail.push(value.email);
    } else {
      sendMail({
        ...mail,
        toMail: mail.toMail.filter((item) => item !== value.email),
      });
    }
    console.log("After all", mail);
    if (searchText.length <= 0) {
      if (document.getElementById("select011").checked) {
        document.getElementById("select011").checked = false;
        document.getElementById(e.target.id).checked = false;
      }

      if (
        mail.toMail.length > 0 &&
        mail.toMail.length === allleaddetails.length
      ) {
        document.getElementById("select011").checked = true;
      } else {
        document.getElementById("select011").checked = false;
      }
    } else {
      document.getElementsByName(e.target.name).checked = true;
    }

    //   for(let i=0; i<allleaddetails.length ; i++){

    //     if(e.target.id != `select${i}`){
    //       document.getElementById(`select${i}`).checked = true
    //     }
    // else {
    //   document.getElementById(e.target.id).checked = false
    // }

    //    }
  };

  const handleChange2 = (e) => {
    // document.getElementById(e.target.id).setAttribute('checked')

    if (e.target.checked === true) {
      console.log("LEngth", allleaddetails.length);
      //  for (let i =0 ; i <= allleaddetails.length ; i++){
      //   all.push(allleaddetails[i].email)

      let temp = [];
      allleaddetails.map((value) => {
        // all.push(value.email)
        temp.push(value.email);
      });

      sendMail({
        ...mail,
        toMail: temp,
      });

      console.log("ALL", mail.toMail);
    } else {
      sendMail({
        ...mail,
        toMail: [],
      });
    }
    if (document.getElementById("select011").checked) {
      // console.log("GGGEE@@");

      for (let i = 0; i < allleaddetails.length; i++) {
        document.getElementById(`select${i}`).checked = true;
      }
    } else {
      // console.log("Select false");
      for (let i = 0; i < allleaddetails.length; i++) {
        document.getElementById(`select${i}`).checked = false;
      }
    }
  };

  useEffect(() => {
    if (searchText.length <= 0)
      if (
        mail.toMail.length > 0 &&
        mail.toMail.length === allleaddetails.length
      ) {
        document.getElementById("select011").checked = true;
      } else {
        document.getElementById("select011").checked = false;
      }

    return () => {};
  });

  const [searchText, setSearchText] = useState("");

  const search = (event) => {
    setAllLeadDetails(
      allmaildetails.filter(
        (user) =>
          `${user.email}`
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
      )
    );

    setSearchText(event.target.value);
  };

  return (
    <div>
      {console.log("ALL", all)}
      <Header />
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Send Mail</h2>
        <div>
          <form>
            {console.log("Maillll -", mail)}

            <label class="text-left">
              <b>To:</b>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              data-toggle="dropdown"
            ></input>

            <div
              className="dropdown-menu toggle__menu"
              style={{ width: "300px", height: "400px", overflowY: "scroll" }}
            >
              <input
                value={searchText}
                onChange={search}
                type="search"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Search"
              ></input>
              {searchText.length <= 0 ? (
                <div className="form-group form-check">
                  <label className="form-check-label">
                    <input
                      id="select011"
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => handleChange2(e)}
                    />{" "}
                    Select All
                  </label>
                </div>
              ) : null}
              {allleaddetails.length > 0 &&
                allleaddetails.map((value, i) => (
                  <div className="form-group form-check" key={i}>
                    <label className="form-check-label">
                      <input
                        id={`select${i}`}
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={allmaildetails.forEach((tt) => {
                          mail.toMail.some((dd) => tt.email == dd);
                        })}
                        name={value.email}
                        value={value.email}
                        onChange={(e) => handleIndustries(e, value)}
                      />{" "}
                      {value.email}
                    </label>
                  </div>
                ))}
            </div>

            <label class="text-left" htmlFor="exampleFormControlInput1">
              <b>Subject</b>
            </label>
            <input
              type="email"
              className="form-control"
              id="subject"
              placeholder="Enter subject"
              value={mail.subject}
              onChange={handleChange}
            />

            <label class="text-left" htmlFor="exampleFormControlTextarea1">
              <b>Text</b>
            </label>
            <textarea
              className="form-control"
              id="text"
              rows={8}
              placeholder="Enter text"
              value={mail.text}
              onChange={handleChange}
            />
          </form>
        </div>
        <br />
        <button
          onClick={onAdd}
          style={{ width: "200px" }}
          type="button"
          class="btn btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMail;
