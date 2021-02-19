import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin";
import Claim from "./Claim/Claim";
import Customer from "./Customer/Customer";
import Detail from "./Customer/Detail";
import Driver from "./Customer/Driver";
import Add from "./Customer/Add";
import CustomerEdit from "./Customer/Edit";
import Dashboard from "./Dashboard/Dashboard";
import AddAdmin from "../Component/Profile/AddAdmin";
import Details from "./Details/Details";
import AddLead from "./Lead/AddLead";
import Edit from "./Lead/Edit";
import Lead from "./Lead/Lead";
import Notes from "./Lead/Notes";
import Blog from "./Blog/Blog";
import AddBlog from "./Blog/AddBlog";
import Invoice from "./Invoice/Invoice";
import LeadHistory from "./Lead/LeadHistory";
import CustomerHistory from "./Customer/CustomerHistory";
import Payment from "./Payment/Payment";
import CustomerNote from "./Customer/CustomerNote";
import InsuranceEdit from "./Customer/InsuranceEdit";
import VehicleEdit from "./Customer/VehicleEdit";
import AddInsurance from "./Customer/AddInsurance";
import AddVehicle from "./Customer/AddVehicle";
import AddClaim from "./Customer/AddClaim";
import AddDriver from "./Customer/AddDriver";
import ClaimEdit from "./Customer/ClaimEdit";
import DriverEdit from "./Customer/DriverEdit";
import ClaimDetails from "./Customer/ClaimDetails";
import InsuranceDetails from "./Customer/InsuranceDetails";
import VehicleDetails from "./Customer/VehicleDetails";
import DriverDetails from "./Customer/DriverDetails";
import Ihistory from "./Customer/Ihistory";
import Chistory from "./Customer/Chistory";
import PermanentIHistory from "./Customer/PermanentIHistory";
import Authentication from "./AuthRoute/AuthRoute";
import EditBlog from "./Blog/Edit";
import Profile from "../Component/Profile/Profile";
import InsuranceSetting from "./Setting/InsuranceSetting";
import VehicleSetting from "./Setting/VehicleSetting";
import PackageSetting from "./Setting/PackageSetting";
import AddInsuranceS from "./Setting/AddInsuranceS";
import AddPackageS from "./Setting/AddPackageS";
import AddVehicleS from "./Setting/AddVehicleS";
import VEdit from "./Setting/VEdit";
import IEdit from "./Setting/IEdit";
import PEdit from "./Setting/PEdit";
import ClaimSeting from "./Setting/ClaimSeting";
import AddClaimS from "./Setting/AddClaimS";
import CEdit from "./Setting/CEdit";
import RentalSeting from "./Setting/RentalSetting";
import AddRentalS from "./Setting/AddRentalS";
import REdit from "./Setting/REdit";
import Email from "./E-mail/Email";
import SendMail from "./E-mail/SendMail";
import AdminEdit from "./Profile/AdminEdit";
import View from "./Profile/View";
import Notification from "./Notification/Notification";
import OnFault from "./OnFault/OnFault";
import OnRight from "./OnRight/OnRight";
import Disputed from "./Disputed/Disputed";
import Contact from "./Contact/Contact";
import DriverHistory from "./Customer/DriverHistory";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import NewPassword from "./ForgotPassword/PasswordUpdate";

import UClaim from "./UClaim/Claim";

import UDashboard from "./UDashboard/Dashboard";
import UDriver from "./UDriver/Driver";

import UInsurance from "./UInsurance/Insurance";
import UProfile from "./UProfile/Profile";
import UAddInsurance from "./UInsurance/AddInsurance";
import UAddDriver from "./UDriver/AddDriver";
import UAddClaim from "./UClaim/AddClaim";
import UClaimDetails from "./UClaim/ClaimDetails";
import UInsuranceDetails from "./UInsurance/InsuranceDetails";
import UResetPassword from "./UResetPassword/ResetPassword";
import UPasswordUpdate from "./UResetPassword/PasswordUpdate";
import ULogin from "./ULogIn/ULogIn";
import ChangePassword from "./ChangePassword/ChangePassword";
import AdminChangePassword from "./AChangePass/AChangePassword";
import UserChangePassword from "./AChangePass/AChangePassword";

function HomeRoute() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={AdminLogin} />
          <Route exact path="/reset" component={ForgotPassword} />
          <Route exact path="/new/:id" component={NewPassword} />
          <Route path="/login" component={ULogin} />
          <Route path="/ureset" component={UResetPassword} />
          <Route path="/updatepassword/:id" component={UPasswordUpdate} />
          <Authentication path="/dashboard" component={Dashboard} />
          <Authentication path="/notification" component={Notification} />
          <Authentication path="/onfault" component={OnFault} />
          <Authentication path="/onright" component={OnRight} />
          <Authentication path="/disputed" component={Disputed} />
          <Authentication path="/lead" component={Lead} />
          <Authentication path="/customer" component={Customer} />
          <Authentication path="/details/:id" component={Details} />
          <Authentication path="/addadmin" component={AddAdmin} />
          <Authentication path="/claim" component={Claim} />
          <Authentication path="/notes/:id" component={Notes} />
          <Authentication path="/edit/:id" component={Edit} />
          <Authentication path="/editblog/:id" component={EditBlog} />
          <Authentication path="/add" component={AddLead} />
          <Authentication path="/customerdetail/:id" component={Detail} />
          <Authentication path="/customeredit/:id" component={CustomerEdit} />
          <Authentication path="/insuranceedit/:id" component={InsuranceEdit} />
          <Authentication path="/claimedit/:id" component={ClaimEdit} />
          <Authentication path="/claimdetails/:id" component={ClaimDetails} />
          <Authentication path="/ihistory" component={Ihistory} />
          <Authentication path="/pihistory" component={PermanentIHistory} />
          <Authentication path="/chistory" component={Chistory} />
          <Authentication
            path="/insurancedetails/:id"
            component={InsuranceDetails}
          />
          <Authentication
            path="/vehicledetails/:id"
            component={VehicleDetails}
          />
          <Authentication path="/driverdetails/:id" component={DriverDetails} />
          <Authentication path="/driveredit/:id" component={DriverEdit} />
          <Authentication path="/driverhistory" component={DriverHistory} />
          <Authentication path="/vehicleedit/:id" component={VehicleEdit} />
          <Authentication path="/customeradd" component={Add} />
          <Authentication path="/addinsurance/:id" component={AddInsurance} />
          <Authentication path="/addvehicle" component={AddVehicle} />
          <Authentication path="/addclaim/:id" component={AddClaim} />
          <Authentication path="/adddriver/:id" component={AddDriver} />
          <Authentication path="/customerdriver" component={Driver} />
          <Authentication path="/customernote/:id" component={CustomerNote} />
          <Authentication path="/blog" component={Blog} />
          <Authentication path="/addblog" component={AddBlog} />
          <Authentication path="/invoice" component={Invoice} />
          <Authentication path="/leadHistory" component={LeadHistory} />
          <Authentication path="/customerHistory" component={CustomerHistory} />
          <Authentication path="/payment" component={Payment} />
          <Authentication path="/profile" component={Profile} />
          <Authentication path="/change/:id" component={ChangePassword} />
          <Authentication
            path="/userchange/:id"
            component={UserChangePassword}
          />
          <Authentication path="/adminedit/:id" component={AdminEdit} />
          <Authentication path="/adminview" component={View} />
          <Authentication path="/email" component={Email} />
          <Authentication path="/sendemail" component={SendMail} />
          <Authentication path="/contact" component={Contact} />
          <Authentication
            path="/insurancesetting"
            component={InsuranceSetting}
          />
          <Authentication path="/vehiclesetting" component={VehicleSetting} />
          <Authentication path="/packagesetting" component={PackageSetting} />
          <Authentication path="/addinsurances" component={AddInsuranceS} />
          <Authentication path="/addpackages" component={AddPackageS} />
          <Authentication path="/addvehicles" component={AddVehicleS} />
          <Authentication path="/vedit/:id" component={VEdit} />
          <Authentication path="/iedit/:id" component={IEdit} />
          <Authentication path="/pedit/:id" component={PEdit} />
          <Authentication path="/claimsetting" component={ClaimSeting} />
          <Authentication path="/addclaims" component={AddClaimS} />
          <Authentication path="/cedit/:id" component={CEdit} />
          <Authentication path="/rentalsetting" component={RentalSeting} />
          <Authentication path="/addrentals" component={AddRentalS} />
          <Authentication path="/redit/:id" component={REdit} />
          <Authentication path="/udashboard" component={UDashboard} />
          <Authentication path="/uinsurance" component={UInsurance} />
          <Authentication path="/uaddinsurance/:id" component={UAddInsurance} />
          <Authentication path="/uvehicle/:id" component={UInsuranceDetails} />
          <Authentication path="/udriver" component={UDriver} />
          <Authentication path="/uadddriver/:id" component={UAddDriver} />
          <Authentication path="/uclaim" component={UClaim} />
          <Authentication path="/uaddclaim/:id" component={UAddClaim} />
          <Authentication path="/uclaimdetails/:id" component={UClaimDetails} />
          <Authentication path="/uprofile" component={UProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default HomeRoute;
