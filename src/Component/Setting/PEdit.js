import React,{useContext, useEffect, useState} from 'react'
import Header from '../Header/Header';
import {Redirect, useParams} from "react-router-dom";
import Context from './Context';
import instance from '../../Instance';

const PEdit = () => {

    const params=useParams()

    const {setting} = useContext(Context)
    useEffect(()=>{
      console.log("id", params.id);
     },[])

     const [userDetails , setUserDetails] = useState({
        packageName: setting!=null ? setting.packageName : '',
        pPrice: setting!=null ? setting.pPrice : ''
      })

      
     const handleChange = (event) => {
        setUserDetails({
          ...userDetails,
          [event.target.id] : event.target.value
        })
      }

      const onSave = (e) => {
        e.preventDefault();
          instance.put("/setting/package/update", {
            packageName: userDetails.packageName,
            pPrice: userDetails.pPrice,
            _id: params.id
          })
          .then(result => {
            console.log("fff" , result)
            setUserDetails({
                packageName: '',
                pPrice: ''
            })
    
          }).catch(err => {
            console.log("Errr" , err)
          })
      }
    
     
        
      if(setting == null){
        return <Redirect to='/vehiclesetting'/>
      }

      
    return (
        <div>
        <Header/>
        <div className="main-content-wrap sidenav-open d-flex flex-column">
     <h2>Edit Vehicle</h2>
     <div className='row'>
<form>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">packageName</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter packageName"  id="packageName"   value={userDetails.packageName} onChange={handleChange} />
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">pPrice</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter pPrice"  id="pPrice"   value={userDetails.pPrice} onChange={handleChange} />
</form>
</div>
<br/>
<button onClick={onSave} style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Save</button>

     </div>
     </div>
    )
}

export default PEdit
