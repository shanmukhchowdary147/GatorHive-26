import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Account from './pages/Account/Account';
import Search from './pages/Search/Search';
import EventDetails from './pages/EventDetails/EventDetails';
import HostEvent from './pages/HostEvent/HostEvent';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/account/:section" component={Account} />
          <Route path="/search" component={Search} />
          <Route path="/hostevent" component={HostEvent} />
          <Route path="/event/:eventId" component={EventDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
