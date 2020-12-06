import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

import { withFirebase } from "../../../firebase";
import * as ROUTES from "../../../constants/routes";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import InputText from "../../atoms/InputText";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignInPage = () => (
  <div>
    <BackgroundFullBleed imageURL={"/assets/backgrounds/overpass.jpg"} />

    <Container fluid={true}>
      <Row>
        <Col
          className="wrapperNarrow__wrapper "
          xs="12"
          lg={{ span: 5, offset: 1 }}
        >
          <div className="wrapperNarrow__padding">
            <div className="logoCenter__container">
              <img src="/assets/logo_transparent.png" alt="logo" />
            </div>

            <SignInForm />
            <PasswordForgetLink />
            <SignUpLink />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.name]: event.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <InputText
          type="text"
          placeholder="Email Address"
          label="Email Address"
          helperText=""
          name="email"
          onChange={this.onChange}
        />

        <InputText
          type="password"
          placeholder="Password"
          label="Password"
          helperText=""
          name="password"
          onChange={this.onChange}
        />

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p className="form__error">{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
