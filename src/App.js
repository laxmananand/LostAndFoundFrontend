import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import Response from "./Components/Response";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./Components/privateroute";
import Home from "./Components/Home";
import ItemPage from "./Components/ItemPage";
import MyListings from "./Components/MyListings";
import { ToastProvider } from "react-toast-notifications";
import DonationPage from "./Components/DonationPage";

const OneSignal = window.OneSignal || [];
const oneSignal = window.OneSignal;

function App() {
  useEffect(() => {
    OneSignal.push(() => {
      oneSignal.init({
        appId: "fe13c665-7830-497e-9a3f-27a523840baf",
        welcomeNotification: {
          title: "One Signal",
          message: "Thanks for subscribing!",
        },
      });
    });
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sign-up" component={Signup} exact />
          <Route path="/log-in" component={Login} />
          <PrivateRoute path="/feed" component={Feed} />
          <Route path="/mylistings" component={MyListings} exact />
          <Route path="/responses" component={Response} exact />
          <Route path="/payment" component={DonationPage} exact />
          <ToastProvider autoDismiss={true} placement={"bottom-right"}>
            <Route path="/:item" component={ItemPage} exact />
          </ToastProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
