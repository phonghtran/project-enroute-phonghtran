import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import * as ROUTES from "../../../constants/routes";

import ProgressBar from "../../atoms/ProgressBar";

class CardDelivery extends Component {
  render() {
    return (
      <div className="cardDelivery__container">
        <h3>
          <Link
            to={{
              pathname: ROUTES.DELIVERY,
              search: `?trackingNumber=${this.props.delivery.trackingNumber}`,
            }}
          >
            {this.props.delivery.name}
          </Link>
        </h3>
        <div className="align-items-center d-md-flex justify-content-between ">
          <div>
            {this.props.delivery.meta.length ? (
              <h4>
                <MetaList meta={this.props.delivery.meta} />
              </h4>
            ) : null}
          </div>

          <div>
            {this.props.delivery.status ? (
              <h4>{this.props.delivery.status}</h4>
            ) : null}
          </div>
        </div>

        {this.props.hideProgressBar ? null : (
          <ProgressBar value={this.props.delivery.progress} />
        )}
      </div>
    );
  }
}

const MetaList = (props) => (
  <div>
    {props.meta.map((tag) => {
      return <span>{tag.value} </span>;
    })}
  </div>
);

export default withRouter(CardDelivery);
