import React, { Component } from "react";

import { withAuthorization } from "../../../session";
import { AuthUserContext } from "../../../session";

import { searchToObject } from "../../../helpers/helpers";
import BackgroundGoogleMap from "../../atoms/BackgroundGoogleMap";
import ProgressBar from "../../atoms/ProgressBar";
import LineChartWrapper from "../../atoms/LineChartWrapper";
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
const rechartData = {
  temperature: [
    { name: "11:10AM", int: 68.1, ext: 72.5 },
    { name: "11:20AM", int: 68.3, ext: 72.4 },
    { name: "11:30AM", int: 69.3, ext: 72.3 },
    { name: "11:40AM", int: 67.2, ext: 74.9 },
    { name: "11:50AM", int: 66.1, ext: 75.4 },
    { name: "12:00PM", int: 67.4, ext: 73.2 },
    { name: "12:10PM", int: 69.1, ext: 72.8 },
  ],
  barometric: [
    { name: "11:10AM", baro: 24 },
    { name: "11:20AM", baro: 24.2 },
    { name: "11:30AM", baro: 24.4 },
    { name: "11:40AM", baro: 23.5 },
    { name: "11:50AM", baro: 23.5 },
    { name: "12:00PM", baro: 23.7 },
    { name: "12:10PM", baro: 24 },
  ],
  airspeed: [
    { name: "11:10AM", airspeed: 24 },
    { name: "11:20AM", airspeed: 25.2 },
    { name: "11:30AM", airspeed: 26.4 },
    { name: "11:40AM", airspeed: 27.5 },
    { name: "11:50AM", airspeed: 27.5 },
    { name: "12:00PM", airspeed: 28.7 },
    { name: "12:10PM", airspeed: 26 },
  ],
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
                  </Row>

                  <Row>
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
                    <Col xs="12" md="4">
                      <h2>Route</h2>

                      <h4 className="--label">Departed From</h4>
                      <p>{delivery.sender.address}</p>

                      <h4 className="--label">Delivery To</h4>
                      <p>{delivery.recipient.address}</p>

                      <h4 className="--label">Drone Coordinates </h4>
                      <p>
                        {delivery.drone.coordinates.lat},&nbsp;
                        {delivery.drone.coordinates.lng}
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" md="4">
                      <h4 className="--label">
                        Internal &amp; External Temperatures
                      </h4>

                      <LineChartWrapper
                        value={rechartData.temperature}
                        lines={["int", "ext"]}
                      />
                    </Col>
                    <Col xs="12" md="4">
                      <h4 className="--label">Barometric Pressure</h4>

                      <LineChartWrapper
                        value={rechartData.barometric}
                        lines={["baro"]}
                      />
                    </Col>
                    <Col xs="12" md="4">
                      <h4 className="--label">Airspeed </h4>

                      <LineChartWrapper
                        value={rechartData.airspeed}
                        lines={["airspeed"]}
                      />
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Delivery);
