import React, { useEffect} from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';


const Dashboard = () => {
    // const history = useHistory();
    // const Submit = () => {
    //     history.push('/lead');   
    //}
    return(
 <div>
       <Header/>
        <Menu/>
        <Footer/>
 </div>
    )
};

export default Dashboard;