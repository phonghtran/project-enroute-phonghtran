import React from "react";

import { withFirebase } from "../../../firebase";

import { SignOut } from "phosphor-react";

const SignOutButton = ({ firebase }) => (
  <SignOut
    className="signout__button nav__icon"
    color="white"
    onClick={firebase.doSignOut}
    size={32}
    weight="bold"
  />
);

export default withFirebase(SignOutButton);
