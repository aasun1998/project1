import React from "react";

export default function Footer() {
  return (
    <div className="search-ui">
      <div className="search-header">
        <img
          src="../../dist-assets/images/logo.png"
          alt="true"
          className="logo"
        />
        <button className="search-close btn btn-icon bg-transparent float-right mt-2">
          <i className="i-Close-Window text-22 text-muted" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="search-input"
        autoFocus
      />
      <div className="search-title">
        <span className="text-muted">Search results</span>
      </div>
      <div className="search-results list-horizontal">
        <div className="list-item col-md-12 p-0">
          <div className="card o-hidden flex-row mb-4 d-flex">
            <div className="list-thumb d-flex">
              {/* TUMBNAIL */}
              <img
                src="../../dist-assets/images/products/headphone-1.jpg"
                alt="true"
              />
            </div>
            <div className="flex-grow-1 pl-2 d-flex">
              <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center flex-lg-row">
                {/* OTHER DATA */}
                <a href="#" className="w-40 w-sm-100">
                  <div className="item-title">Headphone 1</div>
                </a>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  Gadget
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  $300
                  <del className="text-secondary">$400</del>
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                  <span className="badge badge-danger">Sale</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="list-item col-md-12 p-0">
          <div className="card o-hidden flex-row mb-4 d-flex">
            <div className="list-thumb d-flex">
              {/* TUMBNAIL */}
              <img
                src="../../dist-assets/images/products/headphone-2.jpg"
                alt="true"
              />
            </div>
            <div className="flex-grow-1 pl-2 d-flex">
              <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center flex-lg-row">
                {/* OTHER DATA */}
                <a href="#" className="w-40 w-sm-100">
                  <div className="item-title">Headphone 1</div>
                </a>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  Gadget
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  $300
                  <del className="text-secondary">$400</del>
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                  <span className="badge badge-primary">New</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="list-item col-md-12 p-0">
          <div className="card o-hidden flex-row mb-4 d-flex">
            <div className="list-thumb d-flex">
              {/* TUMBNAIL */}
              <img
                src="../../dist-assets/images/products/headphone-3.jpg"
                alt="true"
              />
            </div>
            <div className="flex-grow-1 pl-2 d-flex">
              <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center flex-lg-row">
                {/* OTHER DATA */}
                <a href="#" className="w-40 w-sm-100">
                  <div className="item-title">Headphone 1</div>
                </a>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  Gadget
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  $300
                  <del className="text-secondary">$400</del>
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                  <span className="badge badge-primary">New</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="list-item col-md-12 p-0">
          <div className="card o-hidden flex-row mb-4 d-flex">
            <div className="list-thumb d-flex">
              {/* TUMBNAIL */}
              <img
                src="../../dist-assets/images/products/headphone-4.jpg"
                alt="true"
              />
            </div>
            <div className="flex-grow-1 pl-2 d-flex">
              <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center flex-lg-row">
                {/* OTHER DATA */}
                <a href="#" className="w-40 w-sm-100">
                  <div className="item-title">Headphone 1</div>
                </a>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  Gadget
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100">
                  $300
                  <del className="text-secondary">$400</del>
                </p>
                <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                  <span className="badge badge-primary">New</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PAGINATION CONTROL */}
      <div className="col-md-12 mt-5 text-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination d-inline-flex">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
