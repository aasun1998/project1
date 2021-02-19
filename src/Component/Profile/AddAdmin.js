import React,{useState} from 'react';
import Header from '../Header/Header';
import instance from '../../Instance';

const AddAdmin = () => {

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        fName: '',
        lName: '',
        address: '',
        phone: ''
      });
    
      const handleChange = (event) => {
        setUserDetails({
          ...userDetails,
          [event.target.id]: event.target.value,
        });
      };
    
      const onAdd = () => {
        instance
          .post('/admin/user', {
            email: userDetails.email,
            password: userDetails.password,
            fName: userDetails.fName,
            lName: userDetails.lName,
            address: userDetails.address,
            phone: userDetails.phone
          }, {
            headers : {authorization : `Bearer ${localStorage.getItem('token$')}`}
          })
          .then((result) => {
            // alert.success("Blog Added");
            setUserDetails({
                email: '',
                password: '',
                fName: '',
                lName: '',
                address: '',
                phone: ''
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

   <div style={{width: '300px'}} className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input  type="text" className="form-control" placeholder="F Name" aria-label="Username" aria-describedby="basic-addon1"  id="fName"   value={userDetails.fName} onChange={handleChange} />
</div>
{/* <br/> */}

<div style={{width: '300px'}} className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input  type="text" className="form-control" placeholder="L Name" aria-label="Username" aria-describedby="basic-addon1"  id="lName"   value={userDetails.lName} onChange={handleChange} />
</div>

<div style={{width: '300px'}} className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input  type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"  id="email"   value={userDetails.email} onChange={handleChange} />
</div>

<div  style={{width: '300px'}}  className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7 6a1 1 0 0 1 2 0v1H7V6zm3 0v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z"/>
</svg>
    </span>
  </div>
  <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"  id="password"   value={userDetails.password} onChange={handleChange}/>
</div>


<div style={{width: '300px'}} className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input  type="text" className="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1"  id="phone"   value={userDetails.phone} onChange={handleChange} />
</div>

<div style={{width: '300px'}} className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input  type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1"  id="address"   value={userDetails.address} onChange={handleChange} />
</div>
<button onClick={onAdd} style={{width: '100px'}} type="button" class="btn btn-primary">Add</button>
            </div>
            </div>
    )
}
export default AddAdmin;