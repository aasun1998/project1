import React from "react";
import { useHistory } from "react-router-dom";

const DashboardHeader = () => {
  const history = useHistory();

  const ProfileView = () => {
    history.push("/uprofile");
  };

  const DashboardView = () => {
    history.push("/udashboard");
  };

  const InsuranceView = () => {
    history.push("/uinsurance");
  };

  const DriverView = () => {
    history.push("/udriver");
  };

  const ClaimView = () => {
    history.push("/uclaim");
  };

  const HandleLogout = () => {
    localStorage.removeItem("token$");
    return history.push("/login");
  };

  return (
    <>
      <div className="app-admin-wrap layout-sidebar-large">
        <div className="main-header" style={{ backgroundColor: "#00a65a73" }}>
          <div className="logo">
            <img style={{ width: "100px" }} src={cams} alt />
          </div>
          <div className="menu-toggle">
            <div />
            <div />
            <div />
          </div>
          <div className="d-flex align-items-center">
            {/* Mega menu */}
            {/* <div className="dropdown mega-menu d-none d-md-block">
              <a
                href="#"
                className="btn text-muted dropdown-toggle mr-3"
                id="dropdownMegaMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Mega Menu
              </a>
              <div
                className="dropdown-menu text-left"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="row m-0">
                  <div className="col-md-4 p-4 bg-img">
                    <h2 className="title">
                      Mega Menu <br /> Sidebar
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Asperiores natus laboriosam fugit, consequatur.
                    </p>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Exercitationem odio amet eos dolore suscipit placeat.
                    </p>
                    <button className="btn btn-lg btn-rounded btn-outline-warning">
                      Learn More
                    </button>
                  </div>
                  <div className="col-md-4 p-4">
                    <p className="text-primary text--cap border-bottom-primary d-inline-block">
                      Features
                    </p>
                    <div className="menu-icon-grid w-auto p-0">
                      <a href="#">
                        <i className="i-Shop-4" /> Home
                      </a>
                      <a href="#">
                        <i className="i-Library" /> UI Kits
                      </a>
                      <a href="#">
                        <i className="i-Drop" /> Apps
                      </a>
                      <a href="#">
                        <i className="i-File-Clipboard-File--Text" /> Forms
                      </a>
                      <a href="#">
                        <i className="i-Checked-User" /> Sessions
                      </a>
                      <a href="#">
                        <i className="i-Ambulance" /> Support
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 p-4">
                    <p className="text-primary text--cap border-bottom-primary d-inline-block">
                      Components
                    </p>
                    <ul className="links">
                      <li>
                        <a href="accordion.html">Accordion</a>
                      </li>
                      <li>
                        <a href="alerts.html">Alerts</a>
                      </li>
                      <li>
                        <a href="buttons.html">Buttons</a>
                      </li>
                      <li>
                        <a href="badges.html">Badges</a>
                      </li>
                      <li>
                        <a href="carousel.html">Carousels</a>
                      </li>
                      <li>
                        <a href="lists.html">Lists</a>
                      </li>
                      <li>
                        <a href="popover.html">Popover</a>
                      </li>
                      <li>
                        <a href="tables.html">Tables</a>
                      </li>
                      <li>
                        <a href="datatables.html">Datatables</a>
                      </li>
                      <li>
                        <a href="modals.html">Modals</a>
                      </li>
                      <li>
                        <a href="nouislider.html">Sliders</a>
                      </li>
                      <li>
                        <a href="tabs.html">Tabs</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* / Mega menu */}
            {/* <div className="search-bar">
              <input type="text" placeholder="Search" />
              <i className="search-icon text-muted i-Magnifi-Glass1" />
            </div> */}
          </div>
          <div style={{ margin: "auto" }} />
          <div className="header-part-right">
            {/* Full screen toggle */}
            <i
              className="i-Full-Screen header-icon d-none d-sm-inline-block"
              data-fullscreen
            />
            {/* Grid menu Dropdown */}
            {/* <div className="dropdown">
              <i
                className="i-Safe-Box text-muted header-icon"
                role="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="menu-icon-grid">
                  <a href="#">
                    <i className="i-Shop-4" /> Home
                  </a>
                  <a href="#">
                    <i className="i-Library" /> UI Kits
                  </a>
                  <a href="#">
                    <i className="i-Drop" /> Apps
                  </a>
                  <a href="#">
                    <i className="i-File-Clipboard-File--Text" /> Forms
                  </a>
                  <a href="#">
                    <i className="i-Checked-User" /> Sessions
                  </a>
                  <a href="#">
                    <i className="i-Ambulance" /> Support
                  </a>
                </div>
              </div>
            </div> */}
            {/* Notificaiton */}
            {/* <div className="dropdown"> */}
            {/* <div
                className="badge-top-container"
                role="button"
                id="dropdownNotification"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="badge badge-primary">3</span>
                <i className="i-Bell text-muted header-icon" />
              </div> */}
            {/* Notification dropdown */}
            {/* <div
                className="dropdown-menu dropdown-menu-right notification-dropdown rtl-ps-none"
                aria-labelledby="dropdownNotification"
                data-perfect-scrollbar
                data-suppress-scroll-x="true"
              >
                <div className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className="i-Speach-Bubble-6 text-primary mr-1" />
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>New message</span>
                      <span className="badge badge-pill badge-primary ml-1 mr-1">
                        new
                      </span>
                      <span className="flex-grow-1" />
                      <span className="text-small text-muted ml-auto">
                        10 sec ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      James: Hey! are you busy?
                    </p>
                  </div>
                </div>
                <div className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className="i-Receipt-3 text-success mr-1" />
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>New order received</span>
                      <span className="badge badge-pill badge-success ml-1 mr-1">
                        new
                      </span>
                      <span className="flex-grow-1" />
                      <span className="text-small text-muted ml-auto">
                        2 hours ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      1 Headphone, 3 iPhone x
                    </p>
                  </div>
                </div>
                <div className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className="i-Empty-Box text-danger mr-1" />
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>Product out of stock</span>
                      <span className="badge badge-pill badge-danger ml-1 mr-1">
                        3
                      </span>
                      <span className="flex-grow-1" />
                      <span className="text-small text-muted ml-auto">
                        10 hours ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      Headphone E67, R98, XL90, Q77
                    </p>
                  </div>
                </div>
                <div className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className="i-Data-Power text-success mr-1" />
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>Server Up!</span>
                      <span className="badge badge-pill badge-success ml-1 mr-1">
                        3
                      </span>
                      <span className="flex-grow-1" />
                      <span className="text-small text-muted ml-auto">
                        14 hours ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      Server rebooted successfully
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Notificaiton End */}
            {/* User avatar dropdown */}
            <div className="dropdown">
              <div className="user col align-self-end">
                <img
                  src="../../dist-assets/images/faces/1.jpg"
                  id="userDropdown"
                  alt
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="userDropdown"
                >
                  {/* <div className="dropdown-header">
                    <i className="i-Lock-User mr-1" /> Timothy Carlson
                  </div> */}
                  <a className="dropdown-item" onClick={ProfileView}>
                    Profile
                  </a>
                  {/* <a className="dropdown-item">Sing Out</a> */}
                  <a onClick={HandleLogout} className="dropdown-item">
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-content-wrap">
          <div
            className="sidebar-left open rtl-ps-none"
            data-perfect-scrollbar
            data-suppress-scroll-x="true"
            style={{ overflow: "scroll", backgroundColor: "#00a65a73" }}
          >
            <ul className="navigation-left">
              <li className="nav-item" data-item="dashboard">
                <a className="nav-item-hold" onClick={DashboardView}>
                  <i
                    className="nav-icon i-Bar-Chart"
                    style={{ color: "black" }}
                  />
                  <span className="nav-text" style={{ color: "black" }}>
                    <b>Dashboard</b>
                  </span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item" data-item="uikits">
                <a className="nav-item-hold" onClick={InsuranceView}>
                  <i
                    className="nav-icon i-Library"
                    style={{ color: "black" }}
                  />
                  <span className="nav-text" style={{ color: "black" }}>
                    <b>Insurance</b>
                  </span>
                </a>
                <div className="triangle" />
              </li>
              {/* <li className="nav-item" data-item="extrakits">
                <a className="nav-item-hold" onClick={DriverView}>
                  <i className="nav-icon i-Suitcase" />
                  <span className="nav-text">Driver</span>
                </a>
                <div className="triangle" />
              </li> */}
              <li className="nav-item" data-item="apps">
                <a className="nav-item-hold" onClick={ClaimView}>
                  <i
                    className="nav-icon i-Computer-Secure"
                    style={{ color: "black" }}
                  />
                  <span className="nav-text" style={{ color: "black" }}>
                    <b>Claim</b>
                  </span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item" data-item="apps">
                <a className="nav-item-hold">
                  <i
                    className="nav-icon i-Computer-Secure"
                    style={{ color: "black" }}
                  />
                  <span className="nav-text" style={{ color: "black" }}>
                    <b>Payment</b>
                  </span>
                </a>
                <div className="triangle" />
              </li>
              {/* <li className="nav-item" data-item="widgets">
                <a className="nav-item-hold" href="#">
                  <i className="nav-icon i-Computer-Secure" />
                  <span className="nav-text">Widgets</span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item" data-item="charts">
                <a className="nav-item-hold" href="#">
                  <i className="nav-icon i-File-Clipboard-File--Text" />
                  <span className="nav-text">Charts</span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item" data-item="forms">
                <a className="nav-item-hold" href="#">
                  <i className="nav-icon i-File-Clipboard-File--Text" />
                  <span className="nav-text">Forms</span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item">
                <a className="nav-item-hold" href="datatables.html">
                  <i className="nav-icon i-File-Horizontal-Text" />
                  <span className="nav-text">Datatables</span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item" data-item="sessions">
                <a className="nav-item-hold" href="#">
                  <i className="nav-icon i-Administrator" />
                  <span className="nav-text">Sessions</span>
                </a>
                <div className="triangle" />
              </li>
              <li className="nav-item active" data-item="others">
                <a className="nav-item-hold" href="#">
                  <i className="nav-icon i-Double-Tap" />
                  <span className="nav-text">Others</span>
                </a>
                <div className="triangle" />
              </li> */}
              {/* <li className="nav-item">
                <a
                  className="nav-item-hold"
                  href="http://demos.ui-lib.com/gull-html-doc/"
                  target="_blank"
                >
                  <i className="nav-icon i-Safe-Box1" />
                  <span className="nav-text">Doc</span>
                </a>
                <div className="triangle" />
              </li> */}
            </ul>
          </div>
          {/* <div
            className="sidebar-left-secondary rtl-ps-none"
            data-perfect-scrollbar
            data-suppress-scroll-x="true"
          > */}
          {/* Submenu Dashboards*/}
          {/* <ul className="childNav" data-parent="dashboard">
              <li className="nav-item">
                <a href="dashboard1.html">
                  <i className="nav-icon i-Clock-3" />
                  <span className="item-name">Version 1</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="dashboard2.html">
                  <i className="nav-icon i-Clock-4" />
                  <span className="item-name">Version 2</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="dashboard3.html">
                  <i className="nav-icon i-Over-Time" />
                  <span className="item-name">Version 3</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="dashboard4.html">
                  <i className="nav-icon i-Clock" />
                  <span className="item-name">Version 4</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="forms">
              <li className="nav-item">
                <a href="form.basic.html">
                  <i className="nav-icon i-File-Clipboard-Text--Image" />
                  <span className="item-name">Basic Elements</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="form.layouts.html">
                  <i className="nav-icon i-Split-Vertical" />
                  <span className="item-name">Form Layouts</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="form.input.group.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">Input Groups</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="form.validation.html">
                  <i className="nav-icon i-Close-Window" />
                  <span className="item-name">Form Validation</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="smart.wizard.html">
                  <i className="nav-icon i-Width-Window" />
                  <span className="item-name">Smart Wizard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="tag.input.html">
                  <i className="nav-icon i-Tag-2" />
                  <span className="item-name">Tag Input</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="editor.html">
                  <i className="nav-icon i-Pen-2" />
                  <span className="item-name">Rich Editor</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="apps">
              <li className="nav-item">
                <a href="invoice.html">
                  <i className="nav-icon i-Add-File" />
                  <span className="item-name">Invoice</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="inbox.html">
                  <i className="nav-icon i-Email" />
                  <span className="item-name">Inbox</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="chat.html">
                  <i className="nav-icon i-Speach-Bubble-3" />
                  <span className="item-name">Chat</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="widgets">
              <li className="nav-item">
                <a href="widget-card.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">widget card</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="widget-statistics.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">widget statistics</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="widget-list.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">
                    Widget List{" "}
                    <span className="ml-2 badge badge-pill badge-danger">
                      New
                    </span>
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="widget-app.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">
                    Widget App{" "}
                    <span className="ml-2 badge badge-pill badge-danger">
                      {" "}
                      New
                    </span>
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="weather-card.html">
                  <i className="nav-icon i-Receipt-4" />
                  <span className="item-name">
                    Weather App{" "}
                    <span className="ml-2 badge badge-pill badge-danger">
                      {" "}
                      New
                    </span>
                  </span>
                </a>
              </li>
            </ul> */}
          {/* chartjs*/}
          {/* <ul className="childNav" data-parent="charts">
              <li className="nav-item">
                <a href="charts.echarts.html">
                  <i className="nav-icon i-File-Clipboard-Text--Image" />
                  <span className="item-name">echarts</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="charts.chartsjs.html">
                  <i className="nav-icon i-File-Clipboard-Text--Image" />
                  <span className="item-name">ChartJs</span>
                </a>
              </li>
              <li className="nav-item dropdown-sidemenu">
                <a href="#">
                  <i className="nav-icon i-File-Clipboard-Text--Image" />
                  <span className="item-name">Apex Charts</span>
                  <i className="dd-arrow i-Arrow-Down" />
                </a>
                <ul className="submenu">
                  <li>
                    <a href="charts.apexAreaCharts.html">Area Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexBarCharts.html">Bar Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexBubbleCharts.html">Bubble Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexColumnCharts.html">Column Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexCandleStickCharts.html">
                      CandleStick Charts
                    </a>
                  </li>
                  <li>
                    <a href="charts.apexLineCharts.html">Line Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexMixCharts.html">Mix Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexPieDonutCharts.html">PieDonut Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexRadarCharts.html">Radar Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexRadialBarCharts.html">
                      RadialBar Charts
                    </a>
                  </li>
                  <li>
                    <a href="charts.apexScatterCharts.html">Scatter Charts</a>
                  </li>
                  <li>
                    <a href="charts.apexSparklineCharts.html">
                      Sparkline Charts
                    </a>
                  </li>
                </ul>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="extrakits">
              <li className="nav-item">
                <a href="image.cropper.html">
                  <i className="nav-icon i-Crop-2" />
                  <span className="item-name">Image Cropper</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="loaders.html">
                  <i className="nav-icon i-Loading-3" />
                  <span className="item-name">Loaders</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="ladda.button.html">
                  <i className="nav-icon i-Loading-2" />
                  <span className="item-name">Ladda Buttons</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="toastr.html">
                  <i className="nav-icon i-Bell" />
                  <span className="item-name">Toastr</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="sweet.alerts.html">
                  <i className="nav-icon i-Approved-Window" />
                  <span className="item-name">Sweet Alerts</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="tour.html">
                  <i className="nav-icon i-Plane" />
                  <span className="item-name">User Tour</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="upload.html">
                  <i className="nav-icon i-Data-Upload" />
                  <span className="item-name">Upload</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="uikits">
              <li className="nav-item">
                <a href="alerts.html">
                  <i className="nav-icon i-Bell1" />
                  <span className="item-name">Alerts</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="accordion.html">
                  <i className="nav-icon i-Split-Horizontal-2-Window" />
                  <span className="item-name">Accordion</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="badges.html">
                  <i className="nav-icon i-Medal-2" />
                  <span className="item-name">Badges</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="buttons.html">
                  <i className="nav-icon i-Cursor-Click" />
                  <span className="item-name">Buttons</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="cards.html">
                  <i className="nav-icon i-Line-Chart-2" />
                  <span className="item-name">Cards</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="card.metrics.html">
                  <i className="nav-icon i-ID-Card" />
                  <span className="item-name">Card Metrics</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="carousel.html">
                  <i className="nav-icon i-Video-Photographer" />
                  <span className="item-name">Carousels</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="lists.html">
                  <i className="nav-icon i-Belt-3" />
                  <span className="item-name">Lists</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="pagination.html">
                  <i className="nav-icon i-Arrow-Next" />
                  <span className="item-name">Paginations</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="popover.html">
                  <i className="nav-icon i-Speach-Bubble-2" />
                  <span className="item-name">Popover</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="progressbar.html">
                  <i className="nav-icon i-Loading" />
                  <span className="item-name">Progressbar</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="tables.html">
                  <i className="nav-icon i-File-Horizontal-Text" />
                  <span className="item-name">Tables</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="tabs.html">
                  <i className="nav-icon i-New-Tab" />
                  <span className="item-name">Tabs</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="tooltip.html">
                  <i className="nav-icon i-Speach-Bubble-8" />
                  <span className="item-name">Tooltip</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="modals.html">
                  <i className="nav-icon i-Duplicate-Window" />
                  <span className="item-name">Modals</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="nouislider.html">
                  <i className="nav-icon i-Width-Window" />
                  <span className="item-name">Sliders</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="sessions">
              <li className="nav-item">
                <a href="http://demos.ui-lib.com/gull/html/sessions/signin.html">
                  <i className="nav-icon i-Checked-User" />
                  <span className="item-name">Sign in</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://demos.ui-lib.com/gull/html/sessions/signup.html">
                  <i className="nav-icon i-Add-User" />
                  <span className="item-name">Sign up</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://demos.ui-lib.com/gull/html/sessions/forgot.html">
                  <i className="nav-icon i-Find-User" />
                  <span className="item-name">Forgot</span>
                </a>
              </li>
            </ul> */}
          {/* <ul className="childNav" data-parent="others">
              <li className="nav-item">
                <a href="http://demos.ui-lib.com/gull/html/sessions/not-found.html">
                  <i className="nav-icon i-Error-404-Window" />
                  <span className="item-name">Not Found</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="user.profile.html">
                  <i className="nav-icon i-Male" />
                  <span className="item-name">User Profile</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="open" href="blank.html">
                  <i className="nav-icon i-File-Horizontal" />
                  <span className="item-name">Blank Page</span>
                </a>
              </li>
            </ul> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
