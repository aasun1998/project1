import React, {useState} from 'react'
import Header from '../Header/Header';
import { useAlert } from "react-alert";
import instance from '../../Instance';


const AddPackageS = () => {

    const alert = useAlert();
    const [userDetails, setUserDetails] = useState({
        packageName: '',
        pPrice: ''
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
          .post('/add/package/detail', {
            packageName: userDetails.packageName,
            pPrice: userDetails.pPrice
          }, {
            headers : {authorization : `Bearer ${localStorage.getItem('token$')}`}
          })
          .then((result) => {
            alert.success("Blog Added");
            setUserDetails({
                packageName: '',
                pPrice: ''
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
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">packageName</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter packageName"  id="packageName"   value={userDetails.packageName} onChange={handleChange} />
<label style={{width: '100px'}} htmlFor="email" className="mr-sm-2">pPrice</label>
<input style={{width: '200px'}} type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter pPrice"  id="pPrice"   value={userDetails.pPrice} onChange={handleChange} />
</form>
</div>
<br/>
<button onClick={onAdd} style={{width: '200px'}} type="submit" className="btn btn-primary mb-2">Save</button>

     </div>
     </div>
    )
}

export default AddPackageS
