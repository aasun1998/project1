import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useAlert } from "react-alert";
import instance from "../../Instance";

export default function Chistory() {
  const alert = useAlert();

  const [historyDetails, setHistoryDetails] = useState([]);

  useEffect(() => {
    instance
      .get("/claim/history/view", {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("data", data);
        let temp = data.claimHistoryData;
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
    alert.success("Customer Deleted");
    await instance
      .post(
        `/history/claim/${value._id}`,
        {
          pdf: value.pdf,
          date: value.date,
          fault: value.fault,
          insurance: value.insurance,
          driverName: value.driverName,
          handwrittenForm: value.handwrittenForm,
          make: value.make,
          year: value.year,
          company: value.company,
          model: value.model,
          rego: value.rego,
          policyNo: value.policyNo,
          claimNo: value.claimNo,
          insured: value.insured,
          oName: value.oName,
          oState: value.oState,
          oSuburb: value.oSuburb,
          oAddress: value.oAddress,
          oPost: value.oPost,
          oMobile: value.oMobile,
          dName: value.dName,
          dState: value.dState,
          dSuburb: value.dSuburb,
          dPost: value.dPost,
          dAddress: value.dAddress,
          dMobile: value.dMobile,
          dBirth: value.dBirth,
          dLicenceNo: value.dLicenceNo,
          place: value.place,
          location: value.location,
          street: value.street,
          aDate: value.aDate,
          damageLocation: value.damageLocation,
          aPolicyNo: value.aPolicyNo,
          time: value.time,
          preVehicleDamage: value.preVehicleDamage,
          roadSurface: value.roadSurface,
          carsInvolved: value.carsInvolved,
          whoFault: value.whoFault,
          insuredVehiclePlace: value.insuredVehiclePlace,
          img1: value.img1,
          img2: value.img2,
          img3: value.img3,
          img4: value.img4,
          img5: value.img5,
          img6: value.img6,
          img7: value.img7,
          img8: value.img8,
          img9: value.img9,
          img10: value.img10,
          img11: value.img11,
          img12: value.img12,
          whatHappen: value.whatHappen,
          damageCarPicture1: value.damageCarPicture1,
          damageCarPicture2: value.damageCarPicture2,
          policeReport: value.policeReport,
          policefName: value.policefName,
          policelName: value.policelName,
          ps: value.ps,
          vehicleTowed: value.vehicleTowed,
          towedPlace: value.towedPlace,
          towedBy: value.towedBy,
          repairable: value.repairable,
          witnessoName: value.witnessoName,
          witnesstName: value.witnesstName,
          witnessoNo: value.witnessoNo,
          witnesstNo: value.witnesstNo,
          customerSign: value.customerSign,
          authoritySign: value.authoritySign,
          customerId: value.customerId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token$")}`,
          },
        }
      )
      .then(() => {
        console.log("Sucesss Transfer");
        instance
          .post(`/add/notification`, {
            userId: value.policyNo,
            policyNo: value.claimNo,
            category: "Deleted Claim History",
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
                  <th scope="col">date</th>
                  <th scope="col">fault</th>
                  <th scope="col">insurance</th>
                  <th scope="col">driverName</th>
                  <th scope="col">make</th>
                  <th scope="col">model</th>
                  <th scope="col">year</th>
                  <th scope="col">company</th>
                  <th scope="col">rego</th>

                  <th scope="col">Acion</th>
                </tr>
              </thead>
              <tbody>
                {historyDetails.map((value, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>{value.claimNo}</td>
                    <td>{value.date}</td>
                    <td>{value.fault}</td>
                    <td>{value.insurance}</td>
                    <td>{value.driverName}</td>
                    <td>{value.make}</td>
                    <td>{value.model}</td>
                    <td>{value.year}</td>
                    <td>{value.company}</td>
                    <td>{value.rego}</td>

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
