import React, { Component } from "react";

import { withFirebase } from "../../../firebase";

import PasswordChangeForm from "../../molecules/PasswordChange";
import { AuthUserContext, withAuthorization } from "../../../session";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const dummyData = {
  XWG0gT8hGBaYUXJSpLnb8AnJt1y1: {
    name: "Customer",
    accountType: "customer",
    packages: {
      O9LhSexQmKKNuPRszCDJ: {
        trackingNumber: "O9LhSexQmKKNuPRszCDJ",
        sender: {
          coordinates: { lat: 32.73605, lng: -97.33894 },
          name: "USMD | Medical Clinic of North Texas",
          address: "800 5th Ave #300, Fort Worth, TX 76104",
        },
        drone: {
          coordinates: { lat: 32.763, lng: -97.0598 },
        },
        meta: [{ value: "Today", name: "targetDate" }],
        name: "Blood Vials",
        recipient: {
          name: "Baylor University Medical Center",
          address: "3500 Gaston Ave, Dallas, TX 75246",
          coordinates: { lng: -96.780594, lat: 32.789936 },
        },
        status: "Est. 52 Minutes away",
        progress: 0.42,
      },
      qz8DMTB8yLCDlFbu5bsQ: {
        progress: 0,
        status: "Being Prepared",
        meta: [{ name: "targetDate", value: "December 25, 2020" }],
        trackingNumber: "qz8DMTB8yLCDlFbu5bsQ",
      },
      xbTfto7tWjc9cQFKBQfO: {
        status: "Delivered",
        progress: 1,
        meta: [{ value: "June 2, 2020", name: "targetDate" }],
        trackingNumber: "xbTfto7tWjc9cQFKBQfO",
      },
    },
  },
  ijIQzkhVRoS8M4u3Td9U2NVu8VW2: {
    name: "Contractor",
    accountType: "contractor",
    packages: {
      O9LhSexQmKKNuPRszCDJ: {
        sender: {
          coordinates: { lat: 32.73605, lng: -97.33894 },
          name: "USMD | Medical Clinic of North Texas",
          address: "800 5th Ave #300, Fort Worth, TX 76104",
        },
        drone: {
          coordinates: { lat: 32.763, lng: -97.0598 },
        },
        meta: [{ value: "Today", name: "targetDate" }],
        name: "Blood Vials",
        recipient: {
          name: "Baylor University Medical Center",
          address: "3500 Gaston Ave, Dallas, TX 75246",
          coordinates: { lng: -96.780594, lat: 32.789936 },
        },
        status: "Est. 52 Minutes away",
        progress: 0.42,
        trackingNumber: "O9LhSexQmKKNuPRszCDJ",
      },
    },
  },
};

class AccountPage extends Component {
  updateUserDummy = (uid) => {
    this.props.firebase.user(uid).update(dummyData[uid]);
    this.props.firebase
      .user("ijIQzkhVRoS8M4u3Td9U2NVu8VW2")
      .update(dummyData["ijIQzkhVRoS8M4u3Td9U2NVu8VW2"]);
  };

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
                    <h1>Account </h1>

                    <button onClick={() => this.updateUserDummy(authUser.uid)}>
                      Update dummy
                    </button>

                    <label> Current Email Address</label>
                    <p>{authUser.email}</p>
                    <p>{authUser.uid}</p>
                    <p>{authUser.userData.name}</p>
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(AccountPage));
