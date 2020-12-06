import React, { Component } from "react";

import PasswordChangeForm from "../../molecules/PasswordChange";
import { AuthUserContext, withAuthorization } from "../../../session";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AccountPage extends Component {
  render() {
    return (
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
                    <div className="cardDoubleBorder__wrapper">
                      <div className="cardDoubleBorder__innerContainer">
                        <h2>Account </h2>
                        <label>Account Type</label>
                        <p>{authUser.userData.accountType}</p>
                        <label>Company Name</label>
                        <p>{authUser.userData.companyName}</p>

                        <label>Account Administrator</label>
                        <p>{authUser.userData.name}</p>

                        <label> Current Email Address</label>
                        <p>{authUser.email}</p>
                      </div>
                    </div>
                    {authUser.userData.accountType === "Contractor" && (
                      <h2>FAA Certifications </h2>
                    )}
                    {authUser.userData.certifications > 0 && (
                      <CertificationsList
                        certifications={authUser.userData.certifications}
                        hideProgressBar={true}
                      />
                    )}

                    {authUser.userData.accountType === "Contractor" && (
                      <section>
                        <button disabled={true} type="submit">
                          Add Certification
                        </button>
                      </section>
                    )}
                    <h2>Change Your Password</h2>
                    <p>Disabled for this demonstration.</p>
                    <PasswordChangeForm />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const CertificationsList = (props) => (
  <div>
    {props.certifications.map((certification) => {
      return <p key={certification.name}>{certification.name}</p>;
    })}
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
