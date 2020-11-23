import React from "react";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => (
  <div>
    <BackgroundFullBleed imageURL={"/assets/backgrounds/droneWheat.jpg"} />

    <Container fluid={true}>
      <Row>
        <Col
          className="wrapperNarrow__wrapper "
          xs="12"
          lg={{ span: 5, offset: 1 }}
        >
          <div className="wrapperNarrow__padding">
            <div className="logoCenter__container">
              <img src="/assets/logo.jpg" alt="logo" />
            </div>

            <h1>DroneIQ</h1>

            <p>Demo our technology today by signing in.</p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default App;
