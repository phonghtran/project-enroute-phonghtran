import React, { Component } from "react";

import { withFirebase } from "../../../firebase";

import { searchToObject } from "../../../helpers/helpers";
import BackgroundGoogleMap from "../../atoms/BackgroundGoogleMap";
import ProgressBar from "../../atoms/ProgressBar";

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
              <div className="wrapperNarrow__padding">
                {this.locationQuery.trackingNumber}
                <h1>TODO: pull package details</h1>
                <ProgressBar value={delivery.progress} />
                <p>
                  {delivery.sender.coordinates.lat},
                  {delivery.sender.coordinates.lng}
                </p>
                <p>
                  {delivery.recipient.coordinates.lat},
                  {delivery.recipient.coordinates.lng}
                </p>
                <p>
                  {delivery.drone.coordinates.lat},
                  {delivery.drone.coordinates.lng}
                </p>
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
