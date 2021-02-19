import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import instance from "../../Instance";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function Menu() {
  const history = useHistory();

  const [lead, setLead] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/all/payment/view")
  //     .then(({ data }) => {
  //       console.log("aaaaaaaaallllllldata", data);
  //       console.log("aaaaaaaaallllllldata", data.data);
  //       // setWa(data?.waData);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, []);

  useEffect(() => {
    instance
      .get("/four/lead/view")
      .then(({ data }) => {
        console.log("data", data);
        setLead(data?.lData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [leadcount, setLeadCount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/lead/view")
      .then(({ data }) => {
        console.log("data", data);
        setLeadCount(data?.lData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [customercount, setCustomerCount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/customer/view")
      .then(({ data }) => {
        console.log("data", data);
        setCustomerCount(data?.cData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [icount, setICount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/insurance/view")
      .then(({ data }) => {
        console.log("data", data);
        setICount(data?.iData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [onfaultcount, setOnFaultCount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/onfault/view")
      .then(({ data }) => {
        console.log("data", data);
        setOnFaultCount(data?.onfaultData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [onrightcount, setOnRightCount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/onright/view")
      .then(({ data }) => {
        console.log("data", data);
        setOnRightCount(data?.onrightData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [disputedcount, setDisputedCount] = useState(null);

  useEffect(() => {
    instance
      .get("/count/disputed/view")
      .then(({ data }) => {
        console.log("data", data);
        setDisputedCount(data?.disputedData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    instance
      .get("/four/notification/view")
      .then(({ data }) => {
        console.log("data", data);
        setNotification(data?.nData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [vic, setVic] = useState(null);

  useEffect(() => {
    instance
      .get("/count/vic")
      .then(({ data }) => {
        console.log("vicdata", data);
        setVic(data?.vicData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [act, setAct] = useState(null);

  useEffect(() => {
    instance
      .get("/count/act")
      .then(({ data }) => {
        console.log("actdata", data);
        setAct(data?.actData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [qld, setQld] = useState(null);

  useEffect(() => {
    instance
      .get("/count/qld")
      .then(({ data }) => {
        console.log("qlddata", data);
        setQld(data?.qldData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [sa, setSa] = useState(null);

  useEffect(() => {
    instance
      .get("/count/sa")
      .then(({ data }) => {
        console.log("sadata", data);
        setSa(data?.saData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [wa, setWa] = useState(null);

  useEffect(() => {
    instance
      .get("/count/wa")
      .then(({ data }) => {
        console.log("wadata", data);
        setWa(data?.waData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [tas, setTas] = useState(null);

  useEffect(() => {
    instance
      .get("/count/tas")
      .then(({ data }) => {
        console.log("tasdata", data);
        setTas(data?.tasData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [nsw, setNsw] = useState(null);

  useEffect(() => {
    instance
      .get("/count/nsw")
      .then(({ data }) => {
        console.log("nswdata", data);
        setNsw(data?.nswData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [newlead, setNewLead] = useState(null);

  useEffect(() => {
    instance
      .get("/count/lead/new")
      .then(({ data }) => {
        console.log("newdata", data);
        setNewLead(data?.newData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [readlead, setReadLead] = useState(null);

  useEffect(() => {
    instance
      .get("/count/lead/read")
      .then(({ data }) => {
        console.log("readdata", data);
        setReadLead(data?.readData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [dataSet, setDataSet] = useState(null);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://mixpanel.com/api/2.0/segmentation?project_id=2265976&event=Lead&to_date=${moment(
          new Date().toISOString()
        ).format("YYYY-MM-DD")}&from_date=2020-11-30`,
        {
          headers: {
            authorization:
              "Basic Subham.f060aa.mp-service-account:jsPmg8hBAb8KzxJTvrK6a9NPd2fjOQFE",
            Accept: "application/json",
          },
        }
      )
      .then(({ data }) => {
        console.log("Mix Panel Data Fetech", data);
        // labels: ["0", "5", "10", "15", "20", "25", "30"],
        // datasets: [
        //   {
        //     label: "# of Votes",
        //     data: [12, 19, 3, 5, 2, 3, 10],
        //     fill: false,
        //     backgroundColor: "rgb(255, 99, 132)",
        //     borderColor: "rgba(255, 99, 132, 0.2)",
        //   },
        // ],

        setLabels(data?.data?.series);

        let leadDetails = data?.data?.values.Lead;

        console.log("Sort333 lead Values", Object.entries(leadDetails));
        let temp = [];

        Object.entries(leadDetails)
          .sort()
          .forEach((value) => {
            temp.push(value[1]);
          });

        console.log("Sort lead Values", temp);
        setValues(temp);
      })
      .catch((error) => {
        console.log("Error in Mixpanel data fetch ", error);
      });
  }, []);

  const GoLead = () => {
    history.push("/lead");
  };

  const Notificationpanel = () => {
    history.push("/notification");
    instance
      .put(`/notification/status/view`)
      .then(() => {
        console.log("Update Transfer");
      })
      .catch((err) => {
        console.log("Error in delete", err);
      });
  };

  const OnRight = () => {
    history.push("/onright");
  };

  const OnFault = () => {
    history.push("/onfault");
  };

  const Disputed = () => {
    history.push("/disputed");
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 10, 17, 6, 12, 8, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["VIC", "NSW", "QLD", "ACT", "WA", "TAS", "SA"],
    datasets: [
      {
        label: "# of Votes",
        data: [vic, nsw, qld, act, wa, tas, sa],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data3 = {
    labels: labels,
    datasets: [
      {
        data: values,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options2 = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      {/* <Header /> */}
      {/* =============== Left side End ================*/}
      <div
        className="main-content-wrap sidenav-open d-flex flex-column"
        style={{ backgroundColor: "#E8ECF1" }}
      >
        {/* ============ Body content start ============= */}
        <div className="main-content">
          <div style={{ backgroundColor: "#00a65a73" }} className="breadcrumb">
            <ul>
              <li>
                <a href="#">
                  <b>Dashboard</b>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator-breadcrumb border-top" />
          <div className="row">
            {/* ICON BG*/}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <img
                    style={{ width: "50px" }}
                    src="https://images.squarespace-cdn.com/content/v1/58d178c78419c21896c1aea3/1502716021822-O86A5EG7H0DUE3ML0P0J/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmrMDYraMJMCQwFxTSOIP7LpSBEQpA-g5k6VTjWbSuadHJq0dp98hg5AZvIaPb3DoM/lead.png?format=1000w"
                    alt="lead"
                  />
                  {/* <i className="i-Add-User" /> */}
                  <div className="content">
                    <p className="text-muted mt-2 mb-0">
                      <b>Leads</b>
                    </p>
                    <p className=" text-24 line-height-1">
                      <b>{leadcount}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <img
                    style={{ width: "50px" }}
                    src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/17702429991582884281-512.png"
                    alt="lead"
                  />
                  {/* <i className="i-Financial" /> */}
                  <div className="content">
                    <p className="text-muted mt-2 mb-0">
                      <b>Customers</b>
                    </p>
                    <p className="text-24 line-height-1">
                      <b>{customercount}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <img
                    style={{ width: "50px" }}
                    src="https://img.pngio.com/assessment-document-insurance-letter-official-protection-letter-review-png-512_512.png"
                    alt="lead"
                  />
                  {/* <i className="i-Checkout-Basket" /> */}
                  <div className="content">
                    <p className="text-muted mt-2 mb-0">
                      <b>Insurances</b>
                    </p>
                    <p className=" text-24 line-height-1">
                      <b> {icount}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <img
                    style={{ width: "50px" }}
                    src="https://www.pinclipart.com/picdir/big/216-2160828_flag-letter-p-by-mara-jos-argeso-alphabetically.png"
                    alt="lead"
                  />
                  {/* <i className="i-Money-2" /> */}
                  <div className="content">
                    <p className="text-muted mt-2 mb-0">
                      <b>Payment</b>
                    </p>
                    <p className=" text-24 line-height-1">
                      <b>120</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>Open Claims</h3>
          <div className="row">
            <div className="col-md-4">
              <p onClick={OnRight}>
                <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                  <div className="card-body text-center">
                    <img
                      style={{ width: "50px" }}
                      src="https://www.nicepng.com/png/full/253-2534170_clip-art-at-clker-com-vector-online-green.png"
                      alt="lead"
                    />
                    {/* <i className="i-Checkout-Basket" /> */}
                    <div className="content">
                      <p className="text-muted mt-2 mb-0">
                        <b>On Right</b>
                      </p>
                      <p className=" text-24 line-height-1">
                        <b>{onrightcount}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </p>
            </div>

            <div className="col-md-4">
              <p onClick={OnFault}>
                <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                  <div className="card-body text-center">
                    <img
                      style={{ width: "50px" }}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/////AAD/ZGT/a2v/bW3/8PD/enr/7e3/j4//fn7/6ur/q6v/X1//5+f/9vb/Z2f/pKT/DAz/uLj/oKD/m5v/9fX/Jyf/4uL/1tb/iIj/Gxv/yMj/0ND/cnL/lpb/MTH/Fxf/RET/srL/UFD/u7v/OTn/R0f/goL/1NT/Wlr/3Nz/kpL/Nzf/RUX/ysr/LS0tPlUsAAAIbUlEQVR4nO2dZ4OiMBCGdRULKgoWsIu9rf7/f3eW9c7LpBECA26ej3dryEtCMpmZJIWCwWAwGAwGg8FgMBgMBoPBYEDDsVoTb9ntnWrD+oNKWUSlTmdY49DrvuO10tLXD4ajIgaL2TEVgfshirynxo6fuD67s8ETeOPgOckKPE5dVIHF4mBmJSpwhazvxqJeTU5gK8SW96CSWEe15tjafqgkpXCHrewvnWQEHrEHmX+MkpkYK9i63ign8SlOsvIV3hl5CShENGUoTPU3YrDFFvUf57F2hTP4lLCUBM3Dk9WN781mMx8MRgv48KHuRjweyEe4M82PYOP4PbCa+Z5ofkgDTBU9zU/g44Fm7Op9QKtNPuDQ1/sEEcDcaOpdSK1BE661li9mD/qp1hr0wWz/ZessXwILVKGscxl1BF/BUmPpcsButNdYOpjtNX8EMrS+yErU9RVug9eXkHHPpUNWoqjvNXfJoreBtrLlgVaVthnZATa3doNCqhrgWxnoqsaaLHmu3yiUYQzetK7xrkkW3MZowtucBc0OPQVPBkS5i/SniicNctIa6OlMdfLNhYl6LDlUgTdai08qCMli07W53zmBl61j1u+Rk6GboEdWQItUqGMJB02JafxClQFjjQbjygM2ve6lZxQuZGVGsUc9C4wzB5yp4okDAif1uMMe9CFiTRVPGmR1rjG7lANM0k1qsWYq/pWsUDden/LBDBSzwLg4wOd3jjfWLMny5hirineAhRXvs+mDD3uHZc+8qAJvxiqOTwwMzoO0HVAQvdNXiSysjTvO3PHBUieGCVIly3I1u2GVgPEFdTMSlIXivSDZh2S1lI3T/pksaqezpsqAseasOtaAWMX1orWmqqzJCcNtqBXkgFVFU29NVXFAHOxLrRGTc/zEBRiniq4x4Ly74hps/7CAXTNUKSYA9sxJd02VAaG2rYo3AzrR8Wf7F0dQN4UwA/RelPXXVBlg1yh4M2AwC9N7QTIGjRg5wYbivcBeVbxjgUGiErV6AbDgFWfVhAATxiJqFwMmaZhOFrksR+B8iBgPq4LZvpZy7oWAfo2s4CjaWAO8F5piIPoYg1k/2goD9IEpniufjl0mq1iM0k0noAtkxST9Bwi1RYoYgfDAZunfaN2wf6hCrNhQCr3zeqbdeuA/8EA/u8pPGDB95taK1024Xa0OzSftEmVvU2ymlFLL5VL756HNR8LiNgzP8wGlitJfor8EBltOuHZkprTj7EB7PfnAXZ1EniS7HmYnI18FN9xxM+6WWcpWV2XOXklBX2tOOTA+x3GIXTNtzGlrKacBzKAcM2pAA6eDs/M1KRYg/gAz1XOOS4w3l89qwTuL/1ZDGdk6qZfw3TcI4oQfwVsKZePz+uidxd9PMQv7lxPh8HJsgJyZj+FnTex/ahMWi6un+eZh1yNBHk7e6mcOpE8O96WUj10LZUYSU8C9m8Io2lsZq9nk7t5pjXtNkDKHybnUeMzn1eV0w7U3Z7Sg+F9GX+8ZUEElM7PmZvjm37ZnvJFy5RQcZttsyDTERkYG3TaREuJP2X87uilk/d8K+vEDTlGp4e5ALNo6sXsqW+GWljvjQ1d66uwo8QWnx/xzpsIrPQkRbulOG/rmVRiKesFUyMrv8pB9HWeGP9RmebHtQp/67yEzjgOi3+nCdNyvGY5QH25DecB2OcJMqTSZs4MvjKNXArpCl12Qg+pU5eQ+wZDpg4ButPH29bGHrRTgRSVC6i/2lPSiIj/WOEEM3Cw49SrQx5pLIaD9My9zw0YcTbl7Rulj4JiukBeGg5nD6cHNWadPiWMYsr/DC1A5iMcKcrOw6QrXlAyxIj8LEbMNuZti6Qo9ukJe8kzOvkOGQt5YukccS688hSCB5AFD4YpTEKrvkZfZRT+qi6GwyLFpUBM1OHt24Ka2ByyF7MwUXLuUvSJgneroMbylZ1Yam4N8tiBzSXBhDPENlj+YdbrNEnl9uGEYIxbLwcJUOKCn6u3RnVFtqjXidFmeGqbCYkibE4/0ETlN3CHtA2owRwe2wuI3zNiYZCHhZgF9bU6X7a7mKCxeybfVCBOocHTcL9JfWuEYITyFRTfsvA3O43ZmfN7X+tvM3zqFvL/lKrwxKC99q9+3L7VsZfQtVr2g2u9bx05T8N4bMGf9w+jArRkfRs8ozD1GYf4xCvPPb1DIS8X4BGa4gZYUqBmFuccozD9GYf75DQopN3N8FENGXPFzqBuFuccozD9GYf75DQqzdZ2afurYOb+JYxTmH6Mw/xiF+aeeqRtik6BSaDS/CELxzwYH8kcpcJBIOAvJHzVpxz1KHAJSwjgH0xJvWJY8FLojVkhPLksYW5xyRh5owgAeZmcUpsPnK5Q4OCDvCsVbdCUVLsUZekZhIny+QmYqt1EIkNiubRQmwi9QKF4G6VNYwlAILwdXVbgWn0RTxjj72hEv1mUVivduTTFWTxrbUKww8kUEOpBow4Xc+nAs3uhbwThk32Hsv3tjJKlQvFl7h3Ivt1ghYz8aySUUllRLWAwVCYWMU3VI4C3tJC7KnccSCr/lrvFoCc8RmuPcgigOBLYlR0ChdbTCuRdJPMjLXmzVFS3ylW7Iio8jevXSN2z6oaAgrHuRxoJ13Up6mhYcKqDlynYlBI0of51Rnz8jxr/sWxX+KZbbCLM09dCaF5h3kZ54FYt0XxNnZyleH73D8UZFvAqny/qo27iXBtms7eSLqFaIQ9/h7k6xrwg8lqiBo0EvsqnsrCnHJ4xO2AJvJteQ0r22nspa4Ag+68M4C1eTWWPQU4eK9xQ7wX9n0YQehneGhr1+N53d3VH9xTv2elZ70PP8LLTfi3510qnfr4KadgMrKxfAGgwGg8FgMBgMBoPBYDAYDJ/NH1qmyegZcQElAAAAAElFTkSuQmCC"
                      alt="lead"
                    />
                    {/* <i className="i-Checkout-Basket" /> */}
                    <div className="content">
                      <p className="text-muted mt-2 mb-0">
                        <b>On Fault</b>
                      </p>
                      <p className=" text-24 line-height-1">
                        <b>{onfaultcount}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </p>
            </div>

            <div className="col-md-4">
              <p onClick={Disputed}>
                <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                  <div className="card-body text-center">
                    <img
                      style={{ width: "50px" }}
                      src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/car-512.png"
                      alt="lead"
                    />
                    {/* <i className="i-Checkout-Basket" /> */}
                    <div className="content">
                      <p className="text-muted mt-2 mb-0">
                        <b>Disputed</b>
                      </p>
                      <p className=" text-24 line-height-1">
                        <b>{disputedcount}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card o-hidden mb-4">
                <div
                  style={{ backgroundColor: "#00a65a73" }}
                  className="card-header d-flex align-items-center border-0"
                >
                  <div className="col-md-6">
                    <h3 className="w-50 float-left card-title m-0">
                      New Leads
                    </h3>
                    <h3 className="w-50 float-left card-title m-0">
                      {newlead}
                    </h3>
                  </div>
                  <div className="col-md-6">
                    <h3 className="w-50 float-left card-title m-0">
                      Read Leads
                    </h3>
                    <h3 className="w-50 float-left card-title m-0">
                      {readlead}
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    <table
                      className="table text-center"
                      id="user_table"
                      style={{ marginBottom: "0" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lead != null &&
                          lead.map((value, i) => (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>
                                <a onClick={GoLead}>
                                  {value.firstName}
                                  <br />
                                  {value.lastName}
                                </a>
                              </td>
                              <td>
                                {" "}
                                <a onClick={GoLead}>{value.email}</a>
                              </td>
                              <td>
                                {value.status === true ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                  >
                                    New
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                  >
                                    Read
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card o-hidden mb-4">
                <div
                  style={{ backgroundColor: "#00a65a73" }}
                  className="card-header d-flex align-items-center border-0"
                >
                  <h3 className="w-50 col-md-12 card-title m-0">
                    Notifications
                  </h3>
                </div>
                <div>
                  <div className="table-responsive">
                    <table
                      className="table text-center"
                      id="user_table"
                      style={{ marginBottom: "0" }}
                    >
                      <thead>
                        {/* <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Admin</th>
                          <th scope="col">Worked</th>
                          <th scope="col">User</th>
                        </tr> */}
                      </thead>
                      <tbody>
                        {notification != null &&
                          notification.map((value, i) => (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>
                                <a onClick={Notificationpanel}>
                                  {value.adminId}
                                </a>
                              </td>
                              <td>
                                <a onClick={Notificationpanel}>
                                  {value.category}
                                </a>
                              </td>
                              <td>
                                <a onClick={Notificationpanel}>
                                  {value.userId}
                                </a>
                              </td>
                              <td>
                                {value.status === true ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                  >
                                    New
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                  >
                                    Read
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-6 col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="card-title">Top Selling Products</div>
              <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-4.jpg" alt />
                <div className="flex-grow-1">
                  <h5><a href="#">Wireless Headphone E23</a></h5>
                  <p className="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                  <p className="text-small text-danger m-0">$450
                    <del className="text-muted">$500</del>
                  </p>
                </div>
                <div>
                  <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    View
                    details
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-2.jpg" alt />
                <div className="flex-grow-1">
                  <h5><a href="#">Wireless Headphone Y902</a></h5>
                  <p className="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                  <p className="text-small text-danger m-0">$550
                    <del className="text-muted">$600</del>
                  </p>
                </div>
                <div>
                  <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                    View
                    details
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-3.jpg" alt />
                <div className="flex-grow-1">
                  <h5><a href="#">Wireless Headphone E09</a></h5>
                  <p className="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                  <p className="text-small text-danger m-0">$250
                    <del className="text-muted">$300</del>
                  </p>
                </div>
                <div>
                  <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                    View
                    details
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-4.jpg" alt />
                <div className="flex-grow-1">
                  <h5><a href="#">Wireless Headphone X89</a></h5>
                  <p className="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                  <p className="text-small text-danger m-0">$450
                    <del className="text-muted">$500</del>
                  </p>
                </div>
                <div>
                  <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                    View
                    details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body p-0">
                  <h5 className="card-title m-0 p-3">Last 30 Day Leads</h5>
                  {/* <div id="echart3" style={{height: 360}} /> */}
                  <Line data={data3} options={options2} />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="card o-hidden mb-4">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="w-50 float-left card-title m-0">
                    Policy By State
                  </h3>
                </div>
                <div>
                  <div className="table-responsive">
                    <Pie data={data2} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-title">This Year Sales</div>
                  {/* <div id="echartBar" style={{height: 300}} /> */}
                  <Bar data={data} options={options} />
                </div>
              </div>
            </div>
          </div>
          {/* end of main-content */}
        </div>
        {/* Footer Start */}
        <div className="flex-grow-1" />
        <div className="app-footer">
          <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
            {/* <a className="btn btn-primary text-white btn-rounded" href="https://themeforest.net/item/gull-bootstrap-laravel-admin-dashboard-template/23101970" target="_blank">Buy Gull HTML</a> */}
            <span className="flex-grow-1" />
            <div className="d-flex align-items-center">
              {/* <img className="logo" src="../../dist-assets/images/logo.png" alt /> */}
              <div>
                <p className="m-0">Copyright © 2020</p>
                <p className="m-0">
                  Designed by <b style={{ color: "blue" }}>❤ Techbae Team</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* fotter end */}
      </div>
    </div>
  );
}
