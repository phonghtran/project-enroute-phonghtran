import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

import { AuthUserContext } from "../../../session";
import SignOutButton from "../../atoms/SignOutButton";

import { UserCircle } from "phosphor-react";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : null)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <nav className="align-items-center d-md-flex justify-content-between ">
    <div className="align-items-center d-md-flex  ">
      <Link className="" to={ROUTES.HOME}>
        <img className="nav__logo" src="/assets/logo_reversed.png" alt="logo" />
      </Link>
      <Link className="" to={ROUTES.HOME}>
        <span className="nav__linkText"> Home</span>
      </Link>
    </div>

    <div>
      <Link className="nav__icon" to={ROUTES.ACCOUNT}>
        <UserCircle
          className="icon__button"
          color="white"
          size={32}
          weight="bold"
        />
      </Link>{" "}
      <SignOutButton />
    </div>
  </nav>
);

export default withRouter(Navigation);
