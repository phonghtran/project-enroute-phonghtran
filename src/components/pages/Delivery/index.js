import React, { Component } from "react";

import { withFirebase } from "../../../firebase";

import { searchToObject } from "../../../helpers/helpers";
import BackgroundGoogleMap from "../../atoms/BackgroundGoogleMap";
import ProgressBar from "../../atoms/ProgressBar";
import CardWeather from "../../molecules/CardWeather";

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
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.droneSimulation = {
      interval: null,
      percentage: 0,
    };
  }

  locationQuery = searchToObject(this.props.location.search);

  componentDidMount() {
    this.setState({ loading: true });

    this.listener = this.props.firebase
      .deliveries()
      .doc(this.locationQuery.trackingNumber)
      .onSnapshot((doc) => {
        let delivery = doc.data();

        delivery["trackingNumber"] = doc.id;

        this.setState({
          delivery: delivery,
          loading: false,
          deliveryAPILoaded: true,
        });
      });
  }

  componentWillUnmount() {
    this.listener();
  }

  droneAnimation = () => {
    let count = 0;

    this.droneSimulation.interval = window.setInterval(() => {
      const { delivery } = this.state;

      count += 0.02;
      delivery.progress = count;

      this.setState({
        delivery: delivery,
      });

      if (count >= 1) {
        clearInterval(this.droneSimulation.interval);
      }
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

                        <button onClick={this.droneAnimation}>
                          Simulate Drone Flight
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <ProgressBar value={delivery.progress} />
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
                      <ProgressBar value={delivery.progress} />
                    </Col>
                    <Col xs="12" md="4">
                      <ProgressBar value={delivery.progress} />
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
