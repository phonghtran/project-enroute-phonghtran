import React, { Component } from "react";

import { withAuthorization } from "../../../session";
import { AuthUserContext } from "../../../session";

import { MagnifyingGlass } from "phosphor-react";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";
import CardDelivery from "../../molecules/CardDelivery";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class HomePage extends Component {
  // Packages are currently embedded inside the user's account data via the Context
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => <HomePageBase authUser={authUser} {...this.props} />}
      </AuthUserContext.Consumer>
    );
  }
}

class HomePageBase extends Component {
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

    const packages = this.props.authUser.userData.packages;
    let activeDeliveries = [];
    let recentDeliveries = [];

    for (const trackingNumber in packages) {
      const delivery = packages[trackingNumber];

      if (delivery.progress < 1) {
        activeDeliveries.push(delivery);
      } else {
        recentDeliveries.push(delivery);
      }
    }

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

                {activeDeliveries.length > 0 ? (
                  <div className="cardDoubleBorder__wrapper">
                    <div className="cardDoubleBorder__innerContainer">
                      <h1>Active Deliveries </h1>

                      <CardList deliveries={activeDeliveries} />
                    </div>
                  </div>
                ) : null}

                {recentDeliveries.length > 0 ? (
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
                ) : null}
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
      return (
        <CardDelivery
          delivery={delivery}
          hideProgressBar={props.hideProgressBar}
          key={delivery.trackingNumber}
        />
      );
    })}
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
