import React, { Component } from "react";

import { withAuthorization } from "../../../session";

import BackgroundFullBleed from "../../atoms/BackgroundFullBleed";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class JobSearch extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <BackgroundFullBleed imageURL={"/assets/backgrounds/highways.jpg"} />

        <Container fluid={true}>
          <Row>
            <Col className="wrapperWide__wrapper " xs="12">
              <div className="wrapperWide__padding">
                <h1>Find Contracts</h1>
                <table className="jobSearch__table">
                  <thead>
                    <tr>
                      <th>Sender Rating</th>
                      <th>Sender</th>
                      <th>Recipient</th>
                      <th>Distance</th>
                      <th>Delivery Priority</th>
                      <th>Target Date</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>9.6 </td>
                      <td>
                        Stephanie Capelow
                        <div className="jobSearch__address">
                          7818 Bunker Hill Hill
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        Jasper Mohamed
                        <div className="jobSearch__address">
                          21950 Shoshone Trail <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>30 miles</td>
                      <td>Normal </td>
                      <td>12/21/2020 </td>
                      <td>$100</td>
                      <td>
                        <button className="--small">Select</button>
                      </td>
                    </tr>
                    <tr>
                      <td>4.3 </td>
                      <td>
                        Betsey Keggin
                        <div className="jobSearch__address">
                          5723 Erie Pass
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        Edeline Tring{" "}
                        <div className="jobSearch__address">
                          517 Golf Park
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>53 miles</td>
                      <td>Urgent </td>
                      <td>12/12/2020 </td>
                      <td>$200</td>
                      <td>
                        <button className="--small">Select</button>
                      </td>
                    </tr>
                    <tr>
                      <td>8.7</td>
                      <td>
                        Erin Kingsnod
                        <div className="jobSearch__address">
                          56012 School Pass
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        Judy Brew{" "}
                        <div className="jobSearch__address">
                          88991 Eggendart Road <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>7 miles</td>
                      <td>Normal </td>
                      <td>12/25/2020 </td>
                      <td>$65</td>
                      <td>
                        <button className="--small">Select</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(JobSearch);
