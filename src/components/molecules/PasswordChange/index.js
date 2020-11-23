import React, { Component } from "react";

import { withFirebase } from "../../../firebase";

import InputText from "../../atoms/InputText";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.name]: event.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <InputText
          type="password"
          placeholder="Password"
          label="Password"
          helperText=""
          name="passwordOne"
          onChange={this.onChange}
        />

        <InputText
          type="password"
          placeholder="Password"
          label="Confirm Password"
          helperText=""
          name="passwordTwo"
          onChange={this.onChange}
        />

        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p className="form__error">{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
