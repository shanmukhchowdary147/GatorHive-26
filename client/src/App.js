import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Account from "./pages/Account/Account";
import Search from "./pages/Search/Search";
import EventDetails from "./pages/EventDetails/EventDetails";
import HostEvent from "./pages/HostEvent/HostEvent";
import EditProfile from "./components/Account/EditProfile";
import StudentOrgs from "./pages/StudentOrgs/StudentOrgs";
import AboutUs from "./pages/AboutUs/AboutUs";
import Fake from "./Fake";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/search" component={Search} />
          <Route path="/host-event" component={HostEvent} />
          <Route path="/fake" component={Fake} />
          <Route path="/event" component={EventDetails} />
          <Route path="/student-orgs" component={StudentOrgs} />
          <Route path="/about-us" component={AboutUs} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
