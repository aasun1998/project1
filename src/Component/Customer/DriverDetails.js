import React,{useEffect,useContext,useState} from 'react'
import Header from '../Header/Header';
import {useParams} from "react-router-dom"; 
import Context from './Context';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Details.css";
import instance from '../../Instance';

export default function DriverDetails() {

    const params=useParams()
    const[ allleaddetails, setAllLeadDetails]=useState(null)
    const {setCustomer} = useContext(Context)
  
  
    useEffect(()=>{
      console.log("id", params.id);
     },[])
  
     useEffect(() => {
      instance.get(`/customer/driver/view/${params.id}`, {
        headers : {authorization : `Bearer ${localStorage.getItem('token$')}`}
      }).then(({data})=>{
        console.log("customerdata", data?.driverDetails[0]);
        setAllLeadDetails( data?.driverDetails[0]);
      }).catch(err=>{
        console.log("err", err);
      }) 
     }, [])

     

    return (
         <div>
            <Header/>
            <div className="main-content-wrap sidenav-open d-flex flex-column">
                <div className="row">
                <div className='row'>

<label><b>Personal Details:</b></label>
<br/>
</div>
<div className='row'> 
  <form className='demo'>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Name</label>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">{allleaddetails?.name}</label>
<br/>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Vehicle Type</label>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">{allleaddetails?.vehicle}</label>
<br/>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Mobile</label>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">{allleaddetails?.mobile}</label>

</form>

<form className='demo'>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Address</label>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">{allleaddetails?.address}</label>
<br/>
<label style={{width: '200px'}} htmlFor="pwd" className="mr-sm-2">Post</label>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">{allleaddetails?.post}</label>
<br/>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Suburb</label>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">{allleaddetails?.suburb}</label>
</form>

<form className='demo'>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Date of Birth</label>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">{allleaddetails?.birthdate}</label>
<br/>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">Lience No</label>
<label style={{width: '100px'}} htmlFor="pwd" className="mr-sm-2">{allleaddetails?.licenceno}</label>
<br/>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">Lience Expiery</label>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">{allleaddetails?.licenceexpiry}</label>
</form>

  </div>

                </div>
            </div>
        </div>
    )
}
