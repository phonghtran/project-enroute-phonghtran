import React, { Component } from "react";

import { withAuthorization } from "../../../session";

import { MagnifyingGlass } from "phosphor-react";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import CardDelivery from "../../molecules/CardDelivery";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const deliveries = [
  {
    name: "Blood Vials",
    meta: [
      {
        name: "trackingNumber",
        value: "3849djfdf",
      },
      {
        name: "targetDate",
        value: "Today",
      },
    ],
    status: "Est. 48 Minutes away",
    progress: 0.48,
    trackingNumber: "3849djfdf",
  },
  {
    name: "0anrt489kansdfkm",
    meta: [
      {
        name: "trackingNumber",
        value: "0anrt489kansdfkm",
      },
      {
        name: "targetDate",
        value: "December 25,2020",
      },
    ],
    status: "Being Prepared",
    progress: 0,
    trackingNumber: "0anrt489kansdfkm",
  },

  {
    name: "xdgrtu7i7kkk",
    meta: [
      {
        name: "trackingNumber",
        value: "xdgrtu7i7kkk",
      },
      {
        name: "targetDate",
        value: "Jue 12, 2020",
      },
    ],
    status: "Delivered",
    progress: 1,
    trackingNumber: "xdgrtu7i7kkk",
  },
];

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDeliveries: [],
      loading: false,
      deliveries: [],
      recentDeliveries: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    // TODO pull from firebase

    const activeDeliveries = deliveries.filter((delivery) => {
      return delivery.progress < 1;
    });

    const recentDeliveries = deliveries.filter((delivery) => {
      return delivery.progress === 1;
    });

    this.setState({
      activeDeliveries: activeDeliveries,
      loading: false,
      recentDeliveries: recentDeliveries,
    });
  }

  render() {
    const { activeDeliveries, loading, recentDeliveries } = this.state;

    return (
      <div>
        <BackgroundFullBleed imageURL={"/assets/backgrounds/winter.jpg"} />

        <Container fluid={true}>
          <Row>
            <Col
              className="wrapperWide__wrapper "
              xs="12"
              lg={{ span: 8, offset: 1 }}
            >
              <div className="wrapperWide__padding">
                {loading && <div>Loading ...</div>}

                <div className="cardDoubleBorder__wrapper">
                  <div className="cardDoubleBorder__innerContainer">
                    <h1>Active Deliveries </h1>

                    <CardList deliveries={activeDeliveries} />
                  </div>
                </div>

                <div className="home__recentHistory">
                  <div className="align-items-center d-md-flex justify-content-between ">
                    <h1>Recent History</h1>

                    <MagnifyingGlass
                      className="signout__button"
                      color="black"
                      size={32}
                      weight="bold"
                    />
                  </div>

                  <CardList
                    deliveries={recentDeliveries}
                    hideProgressBar={true}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const CardList = (props) => (
  <div className="cardlist__container">
    {props.deliveries.map((delivery) => {
      console.log(delivery);

      return (
        <CardDelivery
          hideProgressBar={props.hideProgressBar}
          delivery={delivery}
        />
      );
    })}
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
