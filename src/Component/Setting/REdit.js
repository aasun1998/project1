import React,{useContext, useEffect, useState} from 'react'
import Header from '../Header/Header';
import {Redirect, useParams} from "react-router-dom";
import Context from './Context';
import instance from '../../Instance';

const REdit = () => {

    const params=useParams()

    const {setting} = useContext(Context)
    useEffect(()=>{
      console.log("id", params.id);
     },[])

     const [userDetails , setUserDetails] = useState({
        fuelLevel: setting!=null ? setting.fuelLevel : '',
        premiumPeriod: setting!=null ? setting.premiumPeriod : ''
      })

      
     const handleChange = (event) => {
        setUserDetails({
          ...userDetails,
          [event.target.id] : event.target.value
        })
      }

      const onSave = (e) => {
        e.preventDefault();
          instance.put("/setting/rental/update", {
            fuelLevel: userDetails.fuelLevel,
            premiumPeriod: userDetails.premiumPeriod,
            _id: params.id
          })
          .then(result => {
            console.log("fff" , result)
            setUserDetails({
                fuelLevel: '',
                premiumPeriod: ''
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
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">fuelLevel</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter fuelLevel"  id="fuelLevel"   value={userDetails.fuelLevel} onChange={handleChange} />
<br/>
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">premiumPeriod</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter premiumPeriod"  id="premiumPeriod"   value={userDetails.premiumPeriod} onChange={handleChange} />
</form>

</div>
<br/>
<button onClick={onSave} style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Save</button>

     </div>
     </div>
    )
}

export default REdit
