import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../../firebase";
import * as ROUTES from "../../../constants/routes";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import InputText from "../../atoms/InputText";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PasswordForgetPage = () => (
  <div>
    <BackgroundFullBleed imageURL={"/assets/backgrounds/trees.jpg"} />

    <Container fluid={true}>
      <Row>
        <Col
          className="wrapperNarrow__wrapper "
          xs="12"
          lg={{ span: 5, offset: 1 }}
        >
          <div className="wrapperNarrow__padding">
            <Link className="breadbrumb" to={ROUTES.SIGN_IN}>
              Back to Log In
            </Link>

            <h1>Recover Password </h1>
            <p>Disabled for this demonstration.</p>
            <PasswordForgetForm />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: "test",
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    /* Disabling since it isn't needed for this proof-of-concept */

    this.setState({ error: { message: "Disabled for this demonstration." } });
    /* 

    
     const { email } = this.state;

  

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

      */

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.name]: event.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <InputText
          type="text"
          value={this.state.email}
          placeholder="Email Address"
          label="Email Address"
          helperText=""
          name="email"
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

const PasswordForgetLink = () => (
  <Link to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
