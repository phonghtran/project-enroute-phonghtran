import React, { Component } from "react";

import { withAuthorization } from "../../../session";

import { MagnifyingGlass } from "phosphor-react";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import CardDelivery from "../../molecules/CardDelivery";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    this.setState({ loading: true });

    this.listener = this.props.firebase
      .deliveries()
      .onSnapshot((querySnapshot) => {
        let activeDeliveries = [];
        let recentDeliveries = [];

        querySnapshot.forEach(function (doc) {
          let delivery = doc.data();

          delivery["trackingNumber"] = doc.id;

          if (delivery.progress < 1) {
            activeDeliveries.push(delivery);
          } else {
            recentDeliveries.push(delivery);
          }
        });

        this.setState({
          activeDeliveries: activeDeliveries,
          loading: false,
          recentDeliveries: recentDeliveries,
        });
      });
  }

  componentWillUnmount() {
    this.listener();
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
                      className="icon__button"
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
