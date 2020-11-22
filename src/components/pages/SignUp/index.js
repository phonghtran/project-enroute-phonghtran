import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../../../firebase";
import * as ROUTES from "../../../constants/routes";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import InputText from "../../atoms/InputText";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignUpPage = () => (
  <div>
    <BackgroundFullBleed imageURL={"/assets/backgrounds/road.jpg"} />

    <Container fluid={true}>
      <Row>
        <Col
          className="wrapperNarrow__wrapper"
          xs="12"
          lg={{ span: 5, offset: 1 }}
        >
          <div className="wrapperNarrow__padding">
            <Link className="breadbrumb" to={ROUTES.SIGN_IN}>
              Back to Log In
            </Link>
            <h1>Account Registration</h1>

            <SignUpForm />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const INITIAL_STATE = {
  fullname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { fullname, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            name: fullname,
            email: email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch((error) => {
            this.setState({ error });
          });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.name]: event.value });
    console.log(event.name, event.value);
  };

  render() {
    const { fullname, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      fullname === "";

    return (
      <form onSubmit={this.onSubmit}>
        <InputText
          type="text"
          placeholder="Full Name"
          label="Full Name"
          helperText=""
          name="fullname"
          onChange={this.onChange}
        />

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
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
