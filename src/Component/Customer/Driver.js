import React from 'react'
import Header from '../Header/Header';


export default function Driver() {
    return (
        <div>
            <Header/>
            <div className="main-content-wrap sidenav-open d-flex flex-column">
             <h2>Customer Details</h2>
<div style={{overflowX: "scroll"}}>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Add Driver</h2>
<div className='row'>
        <form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

        </div>

        <div className='row'>
        <form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

        </div>

        <button style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Submit</button>
        </div>

        </div>
    )
}
