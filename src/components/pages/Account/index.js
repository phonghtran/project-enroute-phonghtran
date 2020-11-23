import React from "react";

import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../../../session";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <BackgroundFullBleed imageURL={"/assets/backgrounds/urban.jpg"} />

        <Container fluid={true}>
          <Row>
            <Col
              className="wrapperNarrow__wrapper "
              xs="12"
              lg={{ span: 5, offset: 1 }}
            >
              <div className="wrapperNarrow__padding">
                <h1>Account </h1>

                <label> Current Email Address</label>
                <p>{authUser.email}</p>

                <h2>Change Your Password</h2>

                <PasswordChangeForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
