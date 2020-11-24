import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

class BackgroundGoogleMap extends Component {
  constructor(props) {
    super(props);

    this.googleMapObject = null;

    this.mapStyles = {
      width: "50%",
      height: "100%",
    };

    this.mapContainer = React.createRef();
    this.mapObject = React.createRef();
  }

  componentDidMount() {
    this.googleMapObject = new this.props.google.maps.Map(
      this.mapContainer.current,
      {
        center: this.props.delivery.drone.coordinates,
        zoom: 10,
      }
    );

    this.googleMapObject.addListener("dragend", () => {
      console.log(this.googleMapObject.getBounds().toJSON());
    });
  }

  componentDidUpdate() {
    console.log(this.props);

    if (this.props.deliveryAPILoaded === true) {
      let bounds = new this.props.google.maps.LatLngBounds();

      const points = [
        this.props.delivery.sender.coordinates,
        this.props.delivery.recipient.coordinates,
        this.props.delivery.drone.coordinates,
      ];
      const map = this.googleMapObject;

      points.forEach((point) => {
        bounds.extend(point);
        new this.props.google.maps.Marker({
          position: point,
          map,
        });
      });

      const flightPath = new this.props.google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(map);

      this.googleMapObject.fitBounds(bounds);
    }
  }

  debugMaps(mapProps, map) {
    console.log(mapProps);
  }

  render() {
    return (
      <div className="backgroundGoogleMap__wrapper">
        <div
          className="backgroundGoogleMap__container"
          ref={this.mapContainer}
        ></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP_API,
})(BackgroundGoogleMap);
