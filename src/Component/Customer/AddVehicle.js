import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import instance from "../../Instance";
import jsPDF from "jspdf";
import CanvasDraw from "react-canvas-draw";
import SignatureCanvas from "react-signature-canvas";
import download from "../Customer/download.png";

export default function AddVehicle() {
  const [drawValue1, setDrawValue1] = useState(null);
  const [drawValue2, setDrawValue2] = useState(null);
  const divRef1 = useRef();
  const divRef2 = useRef();
  const sigRef1 = useRef();
  const sigRef2 = useRef();

  const [data, setData] = useState(null);
  const [sigData, setSigData] = useState(null);
  const Pdf = () => {
    var doc = new jsPDF("p", "mm", "A4");

    doc.setFontSize(8);
    doc.addHTML(`<div>
    <CanvasDraw
   
  
    style={{
      boxShadow: "2px 4px 10px black",
      backgroundImage: url(${download}),
      backgroundRepeat: "no-repeat",
      backgroundPosition: " center",
    }}
    brushRadius={3}
    canvasWidth={400}
    canvasHeight={300}
    saveData=${divRef1.current.getSaveData()}
  />

  <div style="background-color : red , width : 400px"> </div>

      </div>`);
    doc.text(70, 60, "SUBHAM");
    doc.save("Claim.pdf");
  };

  const handleClick = () => {
    console.log("Dtaa", sigRef1.current.toData());

    let dataUrl = sigRef1.current.toDataURL();

    console.log("Data", dataUrl);
    setSigData(dataUrl);
  };

  return (
    <div>
      <div>
        <Header />
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <button onClick={handleClick} type="button" class="btn btn-primary">
            Primary
          </button>

          <CanvasDraw
            id="vad"
            ref={divRef1}
            style={{
              boxShadow: "2px 4px 10px black",
              backgroundImage: `url(${download})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: " center",
            }}
            brushRadius={3}
            canvasWidth={400}
            canvasHeight={300}
          />
          <div class="card" style={{ width: "30rem" }}>
            <div class="card-body">
              <SignatureCanvas
                penColor="black"
                ref={sigRef1}
                style={{ boxShadow: "2px 4px 10px black" }}
                canvasProps={{
                  width: 400,
                  height: 300,
                  className: "sigCanvas",
                }}
              />
            </div>
          </div>

          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <img src={sigData}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
