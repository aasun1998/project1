import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./headerstyle.css";
export default function Header() {
  const history = useHistory();

  const ref = useRef(null);
  const [settingsHover, setSettingsHover] = useState(false);

  useEffect(() => {
    // this is to find when documnet will click a event called handleClick will trigger
    document.addEventListener("click", handleClick, true);

    // this is for clean up useEffect
    return () => {
      document.addEventListener("click", handleClick, true);
    };
  }, [ref]);

  const handleClick = (e) => {
    // this is to check if ref is a sidebar for example or other div
    if (ref.current && !ref.current.contains(e.target)) {
      // !ref.current.contains(e.target) ===>  that ensures that the clicked div is toogle div or outsider div
      setSettingsHover(false);
    }
  };

  const HandleLogout = () => {
    localStorage.removeItem("token$");
    return history.push("/");
  };

  const Profile = () => {
    history.push("/profile");
  };

  const Vehicle = () => {
    history.push("/vehiclesetting");
  };

  const Insurance = () => {
    history.push("/insurancesetting");
  };

  const Package = () => {
    history.push("/packagesetting");
  };

  const Claim = () => {
    history.push("/claimsetting");
  };

  const Rental = () => {
    history.push("/rentalsetting");
  };

  const Mail = () => {
    history.push("/email");
  };

  const Contact = () => {
    history.push("/contact");
  };

  return (
    <div className="app-admin-wrap layout-sidebar-large">
      <div className="main-header" style={{ backgroundColor: "#00a65a73" }}>
        <div className="logo">
          <img
            style={{ width: "300px", height: "90px" }}
            src={cams}
            alt="true"
          />
        </div>
        <div className="menu-toggle">
          <div />
          <div />
          <div />
        </div>
        {/* <div className="d-flex align-items-center"> */}
        {/* Mega menu */}
        {/* <div className="dropdown mega-menu d-none d-md-block">
      <a href="#" className="btn text-muted dropdown-toggle mr-3" id="dropdownMegaMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mega Menu</a>
      <div className="dropdown-menu text-left" aria-labelledby="dropdownMenuButton">
        <div className="row m-0">
          <div className="col-md-4 p-4 bg-img">
            <h2 className="title">Mega Menu <br /> Sidebar</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores natus laboriosam fugit, consequatur.
            </p>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem odio amet eos dolore suscipit placeat.</p>
            <button className="btn btn-lg btn-rounded btn-outline-warning">Learn More</button>
          </div>
          <div className="col-md-4 p-4">
            <p className="text-primary text--cap border-bottom-primary d-inline-block">Features</p>
            <div className="menu-icon-grid w-auto p-0">
              <a href="#"><i className="i-Shop-4" /> Home</a>
              <a href="#"><i className="i-Library" /> UI Kits</a>
              <a href="#"><i className="i-Drop" /> Apps</a>
              <a href="#"><i className="i-File-Clipboard-File--Text" /> Forms</a>
              <a href="#"><i className="i-Checked-User" /> Sessions</a>
              <a href="#"><i className="i-Ambulance" /> Support</a>
            </div>
          </div>
          <div className="col-md-4 p-4">
            <p className="text-primary text--cap border-bottom-primary d-inline-block">Components</p>
            <ul className="links">
              <li><a href="accordion.html">Accordion</a></li>
              <li><a href="alerts.html">Alerts</a></li>
              <li><a href="buttons.html">Buttons</a></li>
              <li><a href="badges.html">Badges</a></li>
              <li><a href="carousel.html">Carousels</a></li>
              <li><a href="lists.html">Lists</a></li>
              <li><a href="popover.html">Popover</a></li>
              <li><a href="tables.html">Tables</a></li>
              <li><a href="datatables.html">Datatables</a></li>
              <li><a href="modals.html">Modals</a></li>
              <li><a href="nouislider.html">Sliders</a></li>
              <li><a href="tabs.html">Tabs</a></li>
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
        {/* </div> */}
        <div style={{ margin: "auto" }} />
        <div className="header-part-right">
          {/* Full screen toggle */}
          <i
            className="i-Full-Screen header-icon d-none d-sm-inline-block"
            data-fullscreen
          />
          {/* Grid menu Dropdown */}
          {/* <div className="dropdown">
      <i className="i-Safe-Box text-muted header-icon" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div className="menu-icon-grid">
          <a href="#"><i className="i-Shop-4" /> Home</a>
          <a href="#"><i className="i-Library" /> UI Kits</a>
          <a href="#"><i className="i-Drop" /> Apps</a>
          <a href="#"><i className="i-File-Clipboard-File--Text" /> Forms</a>
          <a href="#"><i className="i-Checked-User" /> Sessions</a>
          <a href="#"><i className="i-Ambulance" /> Support</a>
        </div>
      </div>
    </div> */}
          {/* Notificaiton */}
          {/* <div className="dropdown">
      <div className="badge-top-container" role="button" id="dropdownNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="badge badge-primary">3</span>
        <i className="i-Bell text-muted header-icon" />
      </div> */}
          {/* Notification dropdown */}
          {/* <div className="dropdown-menu dropdown-menu-right notification-dropdown rtl-ps-none" aria-labelledby="dropdownNotification" data-perfect-scrollbar data-suppress-scroll-x="true">
        <div className="dropdown-item d-flex">
          <div className="notification-icon">
            <i className="i-Speach-Bubble-6 text-primary mr-1" />
          </div>
          <div className="notification-details flex-grow-1">
            <p className="m-0 d-flex align-items-center">
              <span>New message</span>
              <span className="badge badge-pill badge-primary ml-1 mr-1">new</span>
              <span className="flex-grow-1" />
              <span className="text-small text-muted ml-auto">10 sec ago</span>
            </p>
            <p className="text-small text-muted m-0">James: Hey! are you busy?</p>
          </div>
        </div>
        <div className="dropdown-item d-flex">
          <div className="notification-icon">
            <i className="i-Receipt-3 text-success mr-1" />
          </div>
          <div className="notification-details flex-grow-1">
            <p className="m-0 d-flex align-items-center">
              <span>New order received</span>
              <span className="badge badge-pill badge-success ml-1 mr-1">new</span>
              <span className="flex-grow-1" />
              <span className="text-small text-muted ml-auto">2 hours ago</span>
            </p>
            <p className="text-small text-muted m-0">1 Headphone, 3 iPhone x</p>
          </div>
        </div>
        <div className="dropdown-item d-flex">
          <div className="notification-icon">
            <i className="i-Empty-Box text-danger mr-1" />
          </div>
          <div className="notification-details flex-grow-1">
            <p className="m-0 d-flex align-items-center">
              <span>Product out of stock</span>
              <span className="badge badge-pill badge-danger ml-1 mr-1">3</span>
              <span className="flex-grow-1" />
              <span className="text-small text-muted ml-auto">10 hours ago</span>
            </p>
            <p className="text-small text-muted m-0">Headphone E67, R98, XL90, Q77</p>
          </div>
        </div>
        <div className="dropdown-item d-flex">
          <div className="notification-icon">
            <i className="i-Data-Power text-success mr-1" />
          </div>
          <div className="notification-details flex-grow-1">
            <p className="m-0 d-flex align-items-center">
              <span>Server Up!</span>
              <span className="badge badge-pill badge-success ml-1 mr-1">3</span>
              <span className="flex-grow-1" />
              <span className="text-small text-muted ml-auto">14 hours ago</span>
            </p>
            <p className="text-small text-muted m-0">Server rebooted successfully</p>
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
                alt="true"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userDropdown"
              >
                <a onClick={Profile} className="dropdown-item">
                  Profile
                </a>
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
          style={{
            overflow: "scroll",
            backgroundColor: "#00a65a73",
          }}
        >
          <ul className="navigation-left">
            <li className="nav-item">
              <a className="nav-item-hold" href="/dashboard">
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
            <li className="nav-item">
              <a className="nav-item-hold" href="/lead">
                <i className="nav-icon i-Library" style={{ color: "black" }} />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Leads</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" href="/customer">
                <i className="nav-icon i-Suitcase" style={{ color: "black" }} />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Customers</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" href="/blog">
                <i
                  className="nav-icon i-File-Clipboard-File--Text"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Blog</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" href="/invoice">
                <i
                  className="nav-icon i-File-Horizontal-Text"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Payment</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" href="#">
                <i
                  className="nav-icon i-Administrator"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Invoice</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" onClick={Mail}>
                <i
                  className="nav-icon i-Administrator"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Mail</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li className="nav-item">
              <a className="nav-item-hold" onClick={Contact}>
                <i
                  className="nav-icon i-Administrator"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Contact</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
            <li
              className="nav-item"
              data-item="Settings"
              onMouseOver={() => setSettingsHover(true)}
            >
              <a className="nav-item-hold" href="#">
                <i
                  className="nav-icon i-Double-Tap"
                  style={{ color: "black" }}
                />
                <span className="nav-text" style={{ color: "black" }}>
                  <b>Settings</b>
                </span>
              </a>
              <div className="triangle" />
            </li>
          </ul>
        </div>
        <div
          ref={ref}
          className={
            settingsHover
              ? "sidebar-left-secondary rtl-ps-none ps open"
              : "sidebar-left-secondary rtl-ps-none"
          }
          data-perfect-scrollbar
          data-suppress-scroll-x="true"
          onClick={handleClick}
        >
          {/* Submenu Dashboards*/}
          <ul
            className={settingsHover ? "ee childNav" : "childNav"}
            style={{ width: "250px" }}
            data-parent="Settings"
          >
            <li className="nav-item">
              <a onClick={Vehicle}>
                <i className="nav-icon i-Clock-4" />
                <span className="item-name">Vehicle Body Setting</span>
              </a>
            </li>

            <li className="nav-item">
              <a onClick={Claim}>
                <i className="nav-icon i-Clock" />
                <span className="item-name">Claim Setting</span>
              </a>
            </li>
            {/* <li className="nav-item">
              <a onClick={Rental}>
                <i className="nav-icon i-Clock" />
                <span className="item-name">Rental Setting</span>
              </a>
            </li> */}
            <li className="nav-item">
              <a onClick={Insurance}>
                <i className="nav-icon i-Clock" />
                <span className="item-name">Insurance Package Setting</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="sidebar-overlay" />
      </div>
    </div>
  );
}
