import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

import { AuthUserContext } from "../../../session";
import SignOutButton from "../../atoms/SignOutButton";

import { UserCircle } from "phosphor-react";

class Navigation extends Component {
  // Packages are currently embedded inside the user's account data via the Context
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <NavigationAuth authUser={authUser} {...this.props} />
          ) : null
        }
      </AuthUserContext.Consumer>
    );
  }
}

class NavigationAuth extends Component {
  render() {
    return (
      <nav className="align-items-center d-md-flex justify-content-between ">
        <div className="align-items-center d-md-flex  ">
          <Link className="" to={ROUTES.HOME}>
            <img
              className="nav__logo"
              src="/assets/logo_reversed.png"
              alt="logo"
            />
          </Link>
          <Link className="" to={ROUTES.HOME}>
            <span className="nav__linkText"> Home</span>
          </Link>

          {this.props.authUser.userData.accountType === "contractor" ? (
            <Link className="" to={ROUTES.JOBSEARCH}>
              <span className="nav__linkText">Find Contracts</span>
            </Link>
          ) : null}
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
  }
}
export default withRouter(Navigation);
