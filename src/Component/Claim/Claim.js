import React from 'react'
import Header from '../Header/Header';


export default function Claim() {
    return (
        <div>
        <Header/>
      
      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <div className='row'>
  <form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Claim Date</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Claim Fault</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Insurance Plocy</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Driver First Name</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>

<form>
  <label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Driver First Name</label>
  <input style={{width: '200px'}} type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
  <label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Hand Written Clim From</label>
  <input style={{width: '200px'}} type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="pwd" />
</form>
</div>
<button style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Submit</button>
       </div>
        </div>
    
    )
}
