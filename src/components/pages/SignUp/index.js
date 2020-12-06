import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../../../firebase";
import * as ROUTES from "../../../constants/routes";

import { searchToObject } from "../../../helpers/helpers";
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
          lg={{ span: 8, offset: 1 }}
        >
          <div className="wrapperNarrow__padding">
            <Link className="breadbrumb" to={ROUTES.SIGN_IN}>
              Back to Log In
            </Link>
            <h1>Account Registration</h1>
            <p>Disabled for this demonstration.</p>

            <SignUpForm />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const INITIAL_STATE = {
  companyName: "",
  fullname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  accountType: "Customer",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  locationQuery = searchToObject(this.props.location.search);

  componentDidMount() {
    if (this.locationQuery.accountType) {
      this.setState({
        accountType: this.locationQuery.accountType,
      });
    }
  }
  onSubmit = (event) => {
    /* Disabling since it isn't needed for this proof-of-concept */

    this.setState({ error: { message: "Disabled for this demonstration." } });

    /* const { fullname, email, passwordOne } = this.state;

  this.props.firebase
   .doCreateUserWithEmailAndPassword(email, passwordOne)
   .then((authUser) => {
    
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
   }); */

    event.preventDefault();
  };

  onChange = (event) => {
    if (event.target) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.name]: event.value });
    }
  };

  render() {
    const {
      companyName,
      fullname,
      email,
      passwordOne,
      passwordTwo,
      accountType,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      fullname === "" ||
      companyName === "";

    return (
      <form className="container" onSubmit={this.onSubmit}>
        <Row>
          <Col xs="12">
            <p>
              Are you looking to just order shipping or also looking to operate
              deliveries?
            </p>{" "}
            <p>
              <input
                type="radio"
                id="accountTypeCustomer"
                name="accountType"
                value="Customer"
                checked={accountType === "Customer"}
                onChange={this.onChange}
              />
              <label htmlFor="accountTypeCustomer">Customer</label>

              <input
                type="radio"
                id="accountTypeContractor"
                name="accountType"
                value="Contractor"
                checked={accountType === "Contractor"}
                onChange={this.onChange}
              />
              <label htmlFor="accountTypeContractor">Operator Contractor</label>
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg={{ span: 6 }}>
            <InputText
              type="text"
              placeholder="Company Name"
              label="Company Name"
              helperText=""
              name="companyName"
              onChange={this.onChange}
            />
          </Col>
          <Col xs="12" lg={{ span: 6 }}>
            <InputText
              type="text"
              placeholder="Full Name"
              label="Full Name"
              helperText=""
              name="fullname"
              onChange={this.onChange}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <InputText
              type="text"
              placeholder="Email Address"
              label="Email Address"
              helperText=""
              name="email"
              onChange={this.onChange}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg={{ span: 6 }}>
            <InputText
              type="password"
              placeholder="Password"
              label="Password"
              helperText=""
              name="passwordOne"
              onChange={this.onChange}
            />
          </Col>
          <Col xs="12" lg={{ span: 6 }}>
            <InputText
              type="password"
              placeholder="Password"
              label="Confirm Password"
              helperText=""
              name="passwordTwo"
              onChange={this.onChange}
            />
          </Col>
        </Row>

        {accountType === "Contractor" && (
          <span>
            <h2>FAA Certifications</h2>
            <Row>
              <Col xs="12">
                <InputText
                  type="text"
                  placeholder="Current FAA Waiver Number (Including Part) 
"
                  label="Current FAA Waiver Number (Including Part)"
                  helperText=""
                  name="FAAWaiverNumbeer"
                  onChange={this.onChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Name"
                  label="Pilot #1 Name"
                  helperText=""
                  name="pilot01Name"
                  onChange={this.onChange}
                />
              </Col>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Certification"
                  label="Pilot #1 Certification"
                  helperText=""
                  name="pilot01Certification"
                  onChange={this.onChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Name"
                  label="Pilot #2 Name"
                  helperText=""
                  name="pilot01Name"
                  onChange={this.onChange}
                />
              </Col>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Certification"
                  label="Pilot #2 Certification"
                  helperText=""
                  name="pilot01Certification"
                  onChange={this.onChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Name"
                  label="Pilot #3 Name"
                  helperText=""
                  name="pilot01Name"
                  onChange={this.onChange}
                />
              </Col>
              <Col xs="12" lg={{ span: 6 }}>
                <InputText
                  type="text"
                  placeholder="Pilot Certification"
                  label="Pilot #3 Certification"
                  helperText=""
                  name="pilot01Certification"
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </span>
        )}

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p className="form__error">{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    <Link
      to={{
        pathname: ROUTES.SIGN_UP,
        search: "?accountType=Customer",
      }}
    >
      Register a new account
    </Link>
    <br />
    <Link
      to={{
        pathname: ROUTES.SIGN_UP,
        search: "?accountType=Contractor",
      }}
    >
      Looking to become a drone contractor?
    </Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
