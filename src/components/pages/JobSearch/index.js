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
                <h1>Transportation Requests </h1>
                <table className="jobSearch__table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Recipient</th>
                      <th>Distance</th>
                      <th>Delivery Priority</th>

                      <th>Certification Prerequisite</th>
                      <th>Transportation Date</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Promise Hospital of Dallas
                        <div className="jobSearch__address">
                          7818 Bunker Hill Hill
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        William P Clements Jr University Hospital
                        <div className="jobSearch__address">
                          21950 Shoshone Trail <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>30 miles</td>
                      <td>Normal </td>
                      <td>Commercial Part 107 Waiver </td>
                      <td>12/21/2020 </td>
                      <td>$100</td>
                      <td>
                        <button className="--small">Select</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Promise Hospital of Dallas
                        <div className="jobSearch__address">
                          7818 Bunker Hill Hill
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        Texas Scottish Rite Hospital For Children
                        <div className="jobSearch__address">
                          517 Golf Park
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>53 miles</td>
                      <td>Urgent </td>
                      <td>Commerical 105 Certificate in Class C Airspace</td>
                      <td>12/12/2020 </td>
                      <td>$200</td>
                      <td>
                        <button className="--small">Select</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Methodist Charlton Medical Center
                        <div className="jobSearch__address">
                          56012 School Pass
                          <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>
                        City Hospital
                        <div className="jobSearch__address">
                          88991 Eggendart Road <br />
                          Dallas, TX 75098
                        </div>
                      </td>
                      <td>7 miles</td>
                      <td>Normal </td>
                      <td>Part 107 Operating Certificate </td>
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
