import React from "react";
import "./App.css";
import HomeRoute from "./Component/Route";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LeadProvider from "./Component/Lead/Provider";
import BlogProvider from "./Component/Blog/Provider";
import SettingProvider from "./Component/Setting/Provider";
import CustomerProvider from "./Component/Customer/Provider";
import ProfileProvider from "./Component/Profile/Provider";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import mixpanel from "mixpanel-browser";
mixpanel.init("0906936c3c0ac4a308fb1cb2063297b2");

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

function App() {
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <SettingProvider>
              <ProfileProvider>
                <BlogProvider>
                  <CustomerProvider>
                    <LeadProvider>
                      <HomeRoute />
                    </LeadProvider>
                  </CustomerProvider>
                </BlogProvider>
              </ProfileProvider>
            </SettingProvider>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
