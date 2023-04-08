import React, { useState } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import Calendar from "../../components/Account/Calendar";
import EditProfile from "../../components/Account/EditProfile";
import UpcomingEvents from "../../components/Account/UpcomingEvents";
import EventsAttended from "../../components/Account/EventsAttended";
import EventsHosted from "../../components/Account/EventsHosted";
import Footer from "../../components/Footer/Footer";
import "./Account.css";

const Account = () => {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div>
      <div className="account-page">
        <div className="sidebar">
          <img
            src={require("../../images/owl.png")}
            className="profile-avatar"
          />
          <a
            href="/account/home"
            className={location.pathname === `${url}/home` ? "active" : ""}
          >
            Home
          </a>
          <a
            href="/account/edit"
            className={location.pathname === `${url}/edit` ? "active" : ""}
          >
            Edit Profile
          </a>
          <a
            href="/account/upcoming"
            className={location.pathname === `${url}/upcoming` ? "active" : ""}
          >
            Upcoming Events
          </a>
          <a
            href="/account/attended"
            className={location.pathname === `${url}/attended` ? "active" : ""}
          >
            Events Attended
          </a>
          <a
            href="/account/hosted"
            className={location.pathname === `${url}/hosted` ? "active" : ""}
          >
            Events Hosted
          </a>
        </div>
        <div className="content">
          <Switch>
            <Route exact path={`${url}/home`} component={Calendar} />
            <Route exact path={`${url}/edit`} component={EditProfile} />
            <Route exact path={`${url}/upcoming`} component={UpcomingEvents} />
            <Route exact path={`${url}/attended`} component={EventsAttended} />
            <Route exact path={`${url}/hosted`} component={EventsHosted} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
