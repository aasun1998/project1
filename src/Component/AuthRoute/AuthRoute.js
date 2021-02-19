import {Route , Redirect} from 'react-router-dom'

export default (props) => {

    const token = localStorage.getItem('token$')

    if(token){
      return  <Route {...props}/>
    }
    
   return  <Redirect to='/' />

}