import React, {useState} from 'react'
import Header from '../Header/Header';
import { useAlert } from "react-alert";
import instance from '../../Instance';

const AddRentalS = () => {

    const alert = useAlert();
    const [userDetails, setUserDetails] = useState({
        fuelLevel: '',
        premiumPeriod: ''
      });
    
      const handleChange = (event) => {
        setUserDetails({
          ...userDetails,
          [event.target.id]: event.target.value,
        });
      };
    
      const onAdd = (e) => {
        e.preventDefault();
        instance
          .post('/add/rental/setting', {
            fuelLevel: userDetails.fuelLevel,
            premiumPeriod: userDetails.premiumPeriod
          }, {
            headers : {authorization : `Bearer ${localStorage.getItem('token$')}`}
          })
          .then((result) => {
            alert.success("Blog Added");
            setUserDetails({
                fuelLevel: '',
                premiumPeriod: ''
            });
          })
          .catch((err) => {
            console.log('Errr', err);
          });
      };


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
<button onClick={onAdd} style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Save</button>

     </div>
     </div>
    )
}

export default AddRentalS
