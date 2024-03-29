import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../../molecules/Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import Delivery from "../Delivery";
import * as ROUTES from "../../../constants/routes";
import { withAuthentication } from "../../../session";
import JobSearch from "../JobSearch";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.JOBSEARCH} component={JobSearch} />
      <Route path={ROUTES.DELIVERY} component={Delivery} />
    </div>
  </Router>
);

export default withAuthentication(App);
