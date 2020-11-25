import React, { Component } from "react";

import { withFirebase } from "../../../firebase";
import { AuthUserContext } from "../../../session";

import { searchToObject } from "../../../helpers/helpers";
import BackgroundGoogleMap from "../../atoms/BackgroundGoogleMap";
import ProgressBar from "../../atoms/ProgressBar";
import CardWeather from "../../molecules/CardWeather";
import MetaList from "../../atoms/MetaList";

import { Envelope, PhoneCall } from "phosphor-react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const INITIAL_STATE = {
  loading: false,
  deliveryAPILoaded: false,
  delivery: {
    drone: { coordinates: { lng: 0, lat: 0 } },
    meta: [{ name: "", value: "" }],
    name: "",
    progress: 0,
    recipient: { name: "", address: "", coordinates: { lng: 0, lat: 0 } },
    sender: { coordinates: { lng: 0, lat: 0 }, name: "", address: "" },
    status: "",
    trackingNumber: "",
  },
};

class Delivery extends Component {
  // Packages are currently embedded inside the user's account data via the Context
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => <DeliveryBase authUser={authUser} {...this.props} />}
      </AuthUserContext.Consumer>
    );
  }
}

class DeliveryBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.droneSimulation = null;
    this.checkIfDataIsLoaded = null;
  }

  locationQuery = searchToObject(this.props.location.search);

  componentDidMount() {
    this.setState({ loading: true });
    this.prepData();
  }

  prepData = () => {
    console.log("prep");
    if (this.props.authUser) {
      const delivery = this.props.authUser.userData.packages[
        this.locationQuery.trackingNumber
      ];

      window.clearTimeout(this.checkIfDataIsLoaded);

      this.setState({
        delivery: delivery,
        loading: false,
        deliveryAPILoaded: true,
      });
    } else {
      this.checkIfDataIsLoaded = window.setTimeout(() => {
        this.prepData();
      }, 30);
    }
  };

  droneAnimation = () => {
    const { delivery } = this.state;

    if (delivery.progress >= 1) {
      delivery.progress = 0;
      this.setState({
        delivery: delivery,
      });
    }
    this.droneSimulation = window.setInterval(() => {
      const { delivery } = this.state;

      delivery.progress += 0.02;

      if (delivery.status === "Delivered") {
        delivery.status = `EST. 55 Minutes away`;
      }
      const regex = /([0-9]{1,2})/gi;
      const timer = delivery.status.match(regex);
      let newTime = parseInt(timer) - 1;

      if (newTime < 0) newTime = 0;

      delivery.status = `EST. ${newTime} Minutes away`;

      if (delivery.progress >= 1) {
        delivery.status = "Delivered";

        clearInterval(this.droneSimulation);
      }

      this.setState({
        delivery: delivery,
      });
    }, 50);
  };

  render() {
    const { deliveryAPILoaded, delivery } = this.state;

    return (
      <div>
        <BackgroundGoogleMap
          imageURL={"/assets/backgrounds/road.jpg"}
          delivery={delivery}
          deliveryAPILoaded={deliveryAPILoaded}
        />

        <Container className="delivery__container" fluid={true}>
          <Row>
            <Col className="wrapperNarrow__wrapper" xs="12">
              <div className="wrapperNarrow__padding --fullscreen">
                <Container>
                  <Row>
                    <Col xs="12">
                      <div className="d-md-flex justify-content-between">
                        <h1>
                          {delivery.name
                            ? delivery.name
                            : delivery.trackingNumber}
                        </h1>

                        <div>
                          <button onClick={this.droneAnimation}>
                            Simulate Drone Flight
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <ProgressBar value={delivery.progress} />

                      <div className="align-items-center d-md-flex justify-content-between ">
                        <h2>
                          {delivery.meta.length ? (
                            <MetaList meta={delivery.meta} />
                          ) : null}
                        </h2>

                        <h2>
                          {delivery.status ? (
                            <span> {delivery.status}</span>
                          ) : null}
                        </h2>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="4">
                      <CardWeather
                        coordinates={delivery.drone.coordinates}
                        deliveryAPILoaded={deliveryAPILoaded}
                      />
                    </Col>
                    <Col xs="12" md="4">
                      <h2>Contractor</h2>
                      <h4 className="--label">Reliable Drone Operators</h4>

                      <p>
                        <PhoneCall size={24} color="#A5CC6E" weight="bold" />
                        &nbsp;+1 (682) 555-5555
                        <br />
                        <Envelope size={24} color="#A5CC6E" weight="bold" />
                        &nbsp; contact@reliabledroneoperators.com
                      </p>
                    </Col>
                    <Col xs="12" md="4">
                      <h2>Route</h2>

                      <h4 className="--label">Departed From</h4>
                      <p>{delivery.sender.address}</p>

                      <h4 className="--label">Delivery To</h4>
                      <p>{delivery.recipient.address}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" md="4">
                      <h2>Package STatus</h2>
                      <h4 className="--label">Internal Temperature</h4>

                      <p>62&deg;F / 17&deg;C</p>
                      <h4 className="--label">External Temperature</h4>

                      <p>62&deg;F / 17&deg;C</p>

                      <h4 className="--label">barometric pressure</h4>

                      <p>24 inches</p>

                      <h4 className="--label">Airspeed</h4>

                      <p>24 m/s</p>
                    </Col>
                    <Col xs="12" md="4">
                      <h2>About the Delivery</h2>
                      <h4 className="--label">Size</h4>

                      <p>Small Container (4 ft x 4 ft x 4ft)</p>

                      <h4 className="--label">Cost</h4>

                      <p>$128.23</p>

                      <h4 className="--label">Type</h4>

                      <p>Urgent Rush</p>

                      <h4 className="--label">Tracking Number</h4>

                      <p> {delivery.trackingNumber}</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// const condition = (authUser) => !!authUser;

export default withFirebase(Delivery);
