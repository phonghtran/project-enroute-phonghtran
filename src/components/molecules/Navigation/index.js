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
      <nav className="align-items-center d-flex justify-content-between ">
        <div className="align-items-center d-md-flex  ">
          <Link className="" to={ROUTES.HOME}>
            <img
              className="nav__logo"
              src="/assets/logo_reversed.png"
              alt="logo"
            />
          </Link>

          <div className="align-items-center d-flex  ">
            <Link className="nav__linkText" to={ROUTES.HOME}>
              <span className=""> Home</span>
            </Link>

            {this.props.authUser.userData.accountType === "Contractor" && (
              <Link className="nav__linkText" to={ROUTES.JOBSEARCH}>
                <span className="">Transportation Requests</span>
              </Link>
            )}
          </div>
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
