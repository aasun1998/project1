import React,{useEffect,useContext,useState} from 'react'
import Header from '../Header/Header';
import {useParams} from "react-router-dom"; 
import Context from './Context';
import axios from 'axios';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import instance from '../../Instance';


export default function VehicleDetails() {

    const params=useParams()
    const[ allleaddetails, setAllLeadDetails]=useState([])
    const {setCustomer} = useContext(Context)
  
  
    useEffect(()=>{
      console.log("id", params.id);
     },[])
  
     useEffect(() => {
      instance.get(`/customer/vehicle/view/${params.id}`, {
        headers : {authorization : `Bearer ${localStorage.getItem('token$')}`}
      }).then(({data})=>{
        console.log("customerdata", data?.vehicleDetails[0]);
        setAllLeadDetails( data?.vehicleDetails[0]);
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


                </div>
            </div>
        </div>
    )
}
