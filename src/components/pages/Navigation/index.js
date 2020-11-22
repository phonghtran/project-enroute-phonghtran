import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

import { AuthUserContext } from "../../../session";
import SignOutButton from "../../atoms/SignOutButton";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : null)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <nav className="align-items-center d-md-flex justify-content-between ">
    <Link className="" to={ROUTES.HOME}>
      <img className="nav__logo" src="/assets/logo_reversed.png" alt="logo" />
    </Link>
    <SignOutButton />
  </nav>
);

export default withRouter(Navigation);
