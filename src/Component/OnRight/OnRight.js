import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import instance from "../../Instance";
import { useHistory } from "react-router-dom";

const OnRight = () => {
  const history = useHistory();
  const [fault2, setFault2] = useState(null);
  const [fault, setFault] = useState(null);

  useEffect(() => {
    instance
      .get(`/onright/details/view/`)
      .then(({ data }) => {
        console.log("fault", data);
        setFault(data?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const Details = (value) => {
    history.push(`/customerdetail/${value.customerId}`);
  };

  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>On Right Claim</h2>
        <table class="table table-bordered">
          <thead style={{ backgroundColor: "#00a65a73" }}>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Claim No</th>
              <th scope="col">User</th>
              <th scope="col">Company</th>
              <th scope="col">Rego</th>
              <th scope="col">Insurance</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {fault != null &&
              fault.map((value, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <p onClick={() => Details(value)}>{value?.claimNo}</p>
                  </td>

                  <td>
                    {" "}
                    <p onClick={() => Details(value)}>
                      {value?.onRightDetails?.name}
                    </p>
                  </td>
                  <td>
                    {" "}
                    <p onClick={() => Details(value)}>{value?.company}</p>
                  </td>
                  <td>
                    {" "}
                    <p onClick={() => Details(value)}>{value?.rego}</p>
                  </td>
                  <td>
                    {" "}
                    <p onClick={() => Details(value)}>{value?.insurance}</p>
                  </td>
                  <td>
                    {" "}
                    <p onClick={() => Details(value)}>{value?.location}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnRight;
