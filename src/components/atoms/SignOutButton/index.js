import React from "react";

import { withFirebase } from "../../../firebase";

import { UserCircle } from "phosphor-react";

const SignOutButton = ({ firebase }) => (
  <UserCircle
    className="signout__button"
    color="white"
    onClick={firebase.doSignOut}
    size={32}
    weight="bold"
  />
);

export default withFirebase(SignOutButton);
